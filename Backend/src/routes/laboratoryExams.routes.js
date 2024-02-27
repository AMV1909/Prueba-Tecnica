import { Router } from "express";

import { verifyToken } from "../jwt/jwt.js";
import { verifySpecialist } from "../auth/verifiyRole.js";
import {
    getResults,
    markAsTaken,
    markAsFinished,
} from "../controllers/laboratoryExams.controllers.js";

const router = Router();

router.get("/laboratory-exams", verifyToken, getResults);

router.put(
    "/laboratory-exams/in-progress/:id",
    verifyToken,
    verifySpecialist,
    markAsTaken
);
router.put(
    "/laboratory-exams/finished/:id",
    verifyToken,
    verifySpecialist,
    markAsFinished
);

export { router as laboratoryExamsRoutes };
