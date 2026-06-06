import express from "express";
import { loginUser, logoutUser, registerUser, forgotPassword, resetPassword } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/logout",authMiddleware, logoutUser)


export default authRouter;

