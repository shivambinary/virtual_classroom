import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import sessionRoutes from "./routes/session.routes.js";
import classRoutes from "./routes/class.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import materialRoutes from "./routes/material.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sessions", sessionRoutes);


app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/materials", materialRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

app.use(errorHandler);

export default app;