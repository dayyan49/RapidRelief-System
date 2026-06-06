import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { allowRoles } from '../middleware/role.middleware.js'
import { approveRescue, getPendingRescues } from '../controllers/admin.controllers.js'
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
  getInventorySummary,
} from '../controllers/inventory.controllers.js'


const adminRouter = express.Router()

adminRouter.get("/pendingRescue", authMiddleware, allowRoles("ADMIN"), getPendingRescues)

adminRouter.patch("/approve/:userId", authMiddleware, allowRoles("ADMIN"), approveRescue)

adminRouter.get("/inventory", authMiddleware, allowRoles("ADMIN"), getAllResources)
adminRouter.get("/inventory/summary", authMiddleware, allowRoles("ADMIN"), getInventorySummary)
adminRouter.post("/inventory", authMiddleware, allowRoles("ADMIN"), createResource)
adminRouter.patch("/inventory/:id", authMiddleware, allowRoles("ADMIN"), updateResource)
adminRouter.delete("/inventory/:id", authMiddleware, allowRoles("ADMIN"), deleteResource)

export default adminRouter