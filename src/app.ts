import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger.config";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
