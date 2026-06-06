import { assignment } from "../models/assignment.model.js";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { notifyLocationUpdate } from "../services/notification.service.js";

const hasCloudinary = () =>
  Boolean(ENV.cloud_name && ENV.api_key && ENV.api_secret);

export const applyForRescue = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skills } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.skills = skills || [];
    user.rescueApplicationStatus = "PENDING";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Application submitted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await assignment
      .find({ rescueId: req.user.id })
      .populate("incidentId");

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (lat == null || lon == null) {
      return res.status(400).json({
        success: false,
        message: "lat and lon are required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.location?.current?.lat != null) {
      user.location.lastKnown = {
        lat: user.location.current.lat,
        lon: user.location.current.lon,
        updatedAt: user.location.current.updatedAt || new Date(),
      };
    }

    user.location.current = {
      lat,
      lon,
      updatedAt: new Date(),
    };
    await user.save();

    const activeTasks = await assignment
      .find({ rescueId: user._id, status: { $ne: "COMPLETED" } })
      .populate("incidentId");

    for (const task of activeTasks) {
      if (task.incidentId?.userId) {
        notifyLocationUpdate(task.incidentId.userId, {
          rescueId: user._id,
          rescueName: user.name,
          lat,
          lon,
          incidentId: task.incidentId._id,
          assignmentId: task._id,
          updatedAt: user.location.current.updatedAt,
        });
      }
    }

    return res.status(200).json({
      success: true,
      location: user.location.current,
      lastKnown: user.location.lastKnown,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!hasCloudinary()) {
      return res.status(503).json({
        success: false,
        message: "Cloud storage is not configured. Set CLOUDINARY_* env variables.",
      });
    }

    const { type } = req.body;
    const docType = ["ID_PROOF", "CERTIFICATE"].includes(type) ? type : "ID_PROOF";

    const result = await uploadToCloudinary(req.file.buffer);

    const user = await User.findById(req.user.id);
    user.documents.push({
      url: result.secure_url,
      type: docType,
      uploadedAt: new Date(),
    });
    await user.save();

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      document: user.documents[user.documents.length - 1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
