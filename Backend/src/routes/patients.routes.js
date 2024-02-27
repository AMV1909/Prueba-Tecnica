import { Router } from "express";

import { verifyToken } from "../jwt/jwt.js";
import { verifyDoctor } from "../auth/verifiyRole.js";
import {
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
} from "../controllers/patients.controllers.js";

const router = Router();

router.get("/patients", verifyToken, getPatients);
router.get("/patients/:id", verifyToken, getPatient);

router.post("/patients", verifyToken, verifyDoctor, createPatient);

router.put("/patients/:id", verifyToken, verifyDoctor, updatePatient);

export { router as patientsRoutes };
