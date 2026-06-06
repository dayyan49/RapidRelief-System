import { Incident } from "../models/incident.model.js";
import { assignment as Assignment } from "../models/assignment.model.js";
import { notifyAdmins } from "../services/notification.service.js";

export const createIncident = async (req, res) => {
  try {
    const {
      lat, lon, severity,
      disasterType, description, affectedPopulation,
      rainfallMm, roadBlockagePercent, medicalNeedLevel,
      elderlyPopulation, infrastructureDamageLevel,
      areaSizeKm2, hospitalDistanceKm, responseTimeTargetMin,
    } = req.body;

    const incident = await Incident.create({
      userId: req.user?.id || null,
      location: { lat, lon },
      severity,
      disasterType,
      description,
      affectedPopulation,
      rainfallMm,
      roadBlockagePercent,
      medicalNeedLevel,
      elderlyPopulation,
      infrastructureDamageLevel,
      areaSizeKm2,
      hospitalDistanceKm,
      responseTimeTargetMin,
    });

    notifyAdmins({
      type: "NEW_INCIDENT",
      incident
    });

    return res.status(201).json({
      success: true,
      message: "Help request created",
      incident
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("userId", "name email phoneNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      incidents
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    const incidentIds = incidents.map((i) => i._id);
    const assignments = await Assignment.find({
      incidentId: { $in: incidentIds }
    }).populate("rescueId", "name phoneNumber location");

    const assignmentMap = {};
    assignments.forEach((a) => {
      assignmentMap[a.incidentId.toString()] = a;
    });

    const result = incidents.map((incident) => ({
      ...incident.toObject(),
      assignment: assignmentMap[incident._id.toString()] || null
    }));

    return res.status(200).json({
      success: true,
      incidents: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
