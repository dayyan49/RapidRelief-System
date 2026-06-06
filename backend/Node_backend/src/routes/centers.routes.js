import express from "express";
import { getNearbyCenters, getAllCenters } from "../controllers/centers.controllers.js";

const centersRouter = express.Router();

centersRouter.get("/nearby", getNearbyCenters);
centersRouter.get("/all", getAllCenters);

export default centersRouter;
