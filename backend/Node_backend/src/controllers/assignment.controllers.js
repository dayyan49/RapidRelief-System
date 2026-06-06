import { allocateRescueTeams } from "../services/allocation.services.js";
import { assignment as Assignment } from "../models/assignment.model.js";
import { Incident } from "../models/incident.model.js";
import { notifyStatusUpdate, notifyAdmins } from "../services/notification.service.js";

export const assignRescue = async (req, res) => {
  try {
    const { incidentId } = req.body;

    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    if (incident.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Incident is already assigned or resolved",
      });
    }

    const result = await allocateRescueTeams(incidentId);

    return res.status(201).json({
      success: true,
      message: result.message,
      assignments: result.assignments,
      mlPredictions: {
        teamsRequired: result.teamsRequired,
        ambulancesRequired: result.ambulancesRequired,
        foodPacketsRequired: result.foodPacketsRequired,
        medicalKitsRequired: result.medicalKitsRequired,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { assignmentId, status } = req.body;

    const task = await Assignment.findById(assignmentId).populate("incidentId");
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    if (task.rescueId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    task.status = status;
    if (status === "COMPLETED") {
      task.completedAt = new Date();
    }
    await task.save();

    const incident = await Incident.findById(task.incidentId);
    if (incident) {
      if (status === "EN_ROUTE") {
        incident.status = "IN_PROGRESS";
      } else if (status === "COMPLETED") {
        incident.status = "COMPLETED";
      }
      await incident.save();

      if (incident.userId) {
        notifyStatusUpdate(incident.userId, {
          incidentId: incident._id,
          status: incident.status,
          assignment: task,
        });
      }
    }

    notifyAdmins({
      type: "STATUS_UPDATED",
      assignment: task,
      incident,
    });

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
