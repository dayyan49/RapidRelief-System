import { User } from "../models/user.model.js";

// 🔹 GET PENDING RESCUES
export const getPendingRescues = async (req, res) => {

    try {

      const users =
        await User.find({ rescueApplicationStatus: "PENDING" });

      return res.status(200).json({
        success: true,
        users
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
};


// 🔹 APPROVE RESCUE
export const approveRescue =
  async (req, res) => {

    try {

      const { userId } = req.params;

      const user =
        await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      user.role = "RESCUE";
      user.status = "ACTIVE";
      user.rescueApplicationStatus = "APPROVED";

      user.verification.isVerified = true;
      user.verification.verifiedAt =
        new Date();

      await user.save();

      return res.status(200).json({
        success: true,
        message:
          "Rescue approved"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
};