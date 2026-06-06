import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import rescueRouter from "./routes/rescue.routes.js";
import assignmentRouter from "./routes/assignment.routes.js";
import incidentRouter from "./routes/incident.routes.js";
import adminRouter from "./routes/admin.routes.js";
import centersRouter from "./routes/centers.routes.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/incidents", incidentRouter)
app.use("/api/rescue", rescueRouter)
app.use("/api/assignment", assignmentRouter)
app.use("/api/admin", adminRouter)
app.use("/api/centers", centersRouter)

app.use(errorMiddleware)

export default app;