import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { applyForRescue, getMyTasks, uploadDocument } from '../controllers/rescue.controllers.js'
import { allowRoles } from '../middleware/role.middleware.js'
import { upload } from '../middleware/upload.middleware.js'

const rescueRouter = express.Router()

// apply for rescue
rescueRouter.post("/apply", authMiddleware, applyForRescue)

rescueRouter.post("/upload-document",authMiddleware,upload.single("document"),uploadDocument)

//get assigned task
rescueRouter.get("/tasks", authMiddleware, allowRoles("RESCUE"), getMyTasks)

export default rescueRouter;