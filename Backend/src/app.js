import express from "express";
import cors from "cors";
import morgan from "morgan";

import {
    adminRoutes,
    sessionRoutes,
    patientsRoutes,
    recordsRoutes,
    laboratoryExamsRoutes,
    downloadRoutes,
} from "./routes/index.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(
    "/api",
    adminRoutes,
    sessionRoutes,
    patientsRoutes,
    recordsRoutes,
    laboratoryExamsRoutes,
    downloadRoutes
);

export { app };
