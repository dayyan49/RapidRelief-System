import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";


import { ENV } from "../config/env.js";
import { generateToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/validation.js";


// 🔹 REGISTER
export const registerUser = async (req, res) => {
  try {

    let {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword
    } = req.body;

    // validation
    if ((!email && !phoneNumber) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password required"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 chars"
      });
    }

    // normalize
    email = email?.toLowerCase();
    phoneNumber = phoneNumber?.replace(/\D/g, "");
    name = name?.trim();

    // existing user check
    const query = [];

    if (email) query.push({ email });
    if (phoneNumber) query.push({ phoneNumber });

    const existingUser = await User.findOne({
      $or: query
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role: "USER",
      status: "ACTIVE",
      isGuest: false
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// 🔹 LOGIN
export const loginUser = async (req, res) => {
  try {

    const {
      email,
      phoneNumber,
      password
    } = req.body;
    

    if ((!email && !phoneNumber) || !password) {
      return res.status(400).json({
        success: false,
        message: "Credentials required"
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Account not active"
      });
    }

    // compare password
    const isMatch =
      await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // token
    const token = generateToken({
        id: user._id,
        role: user.role
      })
    

    // remove old sessions
    await Session.deleteMany({
      userId: user._id
    });

    // create session
    await Session.create({
      userId: user._id,
      token,
      isActive: true,
      expiresAt:
        new Date(
          Date.now() +
          7 * 24 * 60 * 60 * 1000
        )
    });

    user.isLoggedIn = true;
    user.lastLogin = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// 🔹 LOGOUT
export const logoutUser = async (req, res) => {
  try {

    const token = req.headers.authorization;

    await Session.updateOne(
      { token },
      {isActive: false}
    );

    return res.status(200).json({
      success: true,
      message: "Logged out"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};