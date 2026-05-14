import { assignment } from "../models/assignment.model.js";
import { User } from "../models/user.model.js";


// 🔹 APPLY FOR RESCUE
export const applyForRescue = async (req, res) => {
    try {
      const userId = req.user.id;

      const { skills } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      user.skills = skills || [];
      user.status = "PENDING";

      await user.save();

      return res.status(200).json({
        success: true,
        message:
          "Application submitted"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
};


// 🔹 GET MY TASKS
export const getMyTasks = async (req, res) => {
    try {

      const tasks = await assignment.find({rescueId: req.user.id}).populate("incidentId");

      return res.status(200).json({
        success: true,
        tasks
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
};

// 🔹 upload rescue document
export const uploadDocument = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
       const result =
        await uploadToCloudinary(
          req.file.buffer
        );

      res.status(200).json({
        success: true,
        url: result.secure_url
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
};