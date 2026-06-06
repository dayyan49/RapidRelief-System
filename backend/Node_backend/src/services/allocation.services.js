import { assignment as Assignment } from "../models/assignment.model.js";
import { Incident } from "../models/incident.model.js";
import { User } from "../models/user.model.js";
import { callPythonService } from "./python.services.js";
import { notifyAssignment, notifyStatusUpdate, notifyAdmins } from "./notification.service.js";

const deriveMlFields = (incident, availableRescueCount) => ({
  severity: incident.severity,
  affected_population: incident.affectedPopulation ?? 1,
  disaster_type: incident.disasterType ?? "OTHER",
  rainfall_mm: incident.rainfallMm ?? incident.severity * 5,
  road_blockage_percent: incident.roadBlockagePercent ?? incident.severity * 8,
  medical_need_level: incident.medicalNeedLevel ?? Math.min(10, Math.ceil(incident.severity * 0.8)),
  elderly_population: incident.elderlyPopulation ?? Math.floor((incident.affectedPopulation ?? 1) * 0.15),
  infrastructure_damage_level: incident.infrastructureDamageLevel ?? incident.severity,
  rescue_team_availability: availableRescueCount,
  area_size_km2: incident.areaSizeKm2 ?? 2,
  hospital_distance_km: incident.hospitalDistanceKm ?? 5,
  response_time_target_min: incident.responseTimeTargetMin ?? 30,
  location: [incident.location.lat, incident.location.lon],
});

export const allocateRescueTeams = async (incidentId) => {
  const incident = await Incident.findById(incidentId);
  if (!incident) {
    throw new Error("Incident not found");
  }

  const rescues = await User.find({ role: "RESCUE", status: "ACTIVE" });
  const existingAssignments = await Assignment.find({ incidentId }).select("rescueId");
  const assignedIds = new Set(existingAssignments.map((a) => a.rescueId.toString()));

  const availableRescues = rescues.filter((r) => !assignedIds.has(r._id.toString()));

  const resources = availableRescues
    .filter((r) => r.location?.current?.lat && r.location?.current?.lon)
    .map((r) => ({
      id: r._id.toString(),
      lat: r.location.current.lat,
      lon: r.location.current.lon,
    }));

  let result = null;

  try {
    const payload = {
      ...deriveMlFields(incident, availableRescues.length),
      resources,
    };
    result = await callPythonService(payload);
  } catch (error) {
    console.error("ML service unavailable, using fallback allocation:", error.message);
    result = {
      teams_required: 1,
      ambulances_required: 1,
      food_packets_required: incident.affectedPopulation ?? 1,
      medical_kits_required: 1,
      allocated: resources.slice(0, 1),
      message: "Fallback allocation (ML service unavailable)",
    };
  }

  let allocated = result.allocated || [];

  if (allocated.length === 0 && availableRescues.length > 0) {
    const fallback = availableRescues[0];
    allocated = [{
      id: fallback._id.toString(),
      lat: fallback.location?.current?.lat ?? incident.location.lat,
      lon: fallback.location?.current?.lon ?? incident.location.lon,
    }];
  }

  if (allocated.length === 0) {
    throw new Error("No rescue teams available");
  }

  incident.mlPredictions = {
    teamsRequired: result.teams_required,
    ambulancesRequired: result.ambulances_required,
    foodPacketsRequired: result.food_packets_required,
    medicalKitsRequired: result.medical_kits_required,
    predictedAt: new Date(),
  };
  incident.status = "ASSIGNED";
  await incident.save();

  const assignments = [];

  for (const rescue of allocated) {
    const newAssignment = await Assignment.create({
      incidentId: incident._id,
      rescueId: rescue.id,
    });
    assignments.push(newAssignment);

    notifyAssignment(rescue.id, {
      assignment: newAssignment,
      incident,
      mlPredictions: incident.mlPredictions,
    });
  }

  notifyAdmins({
    type: "ASSIGNMENT_CREATED",
    assignments,
    incident,
    mlPredictions: incident.mlPredictions,
  });

  if (incident.userId) {
    notifyStatusUpdate(incident.userId, {
      incidentId: incident._id,
      status: incident.status,
      assignments,
      mlPredictions: incident.mlPredictions,
    });
  }

  return {
    teamsRequired: result.teams_required,
    ambulancesRequired: result.ambulances_required,
    foodPacketsRequired: result.food_packets_required,
    medicalKitsRequired: result.medical_kits_required,
    assignments,
    message: result.message,
  };
};
