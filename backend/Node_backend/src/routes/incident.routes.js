import express from "express";
import { authMiddleware, optionalAuth } from '../middleware/auth.middleware.js'
import { createIncident, getAllIncidents, getMyIncidents } from "../controllers/incident.controllers.js";
import { allowRoles } from "../middleware/role.middleware.js";

const incidentRouter = express.Router();

// 🔹 create incident
// allows guest + logged-in users
incidentRouter.post("/create", optionalAuth, createIncident)

// 🔹 get my incidents (citizen)
incidentRouter.get("/mine", authMiddleware, allowRoles("USER"), getMyIncidents)

// 🔹 get all incidents
incidentRouter.get("/all", authMiddleware, allowRoles("ADMIN", "RESCUE"), getAllIncidents)


export default incidentRouter;