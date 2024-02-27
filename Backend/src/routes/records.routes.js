import { Router } from "express";

import {
    getRecords,
    getRecord,
    createRecord,
} from "../controllers/records.controllers.js";
import { verifyToken } from "../jwt/jwt.js";
import { verifyDoctor } from "../auth/verifiyRole.js";

const router = Router();

router.get("/records", verifyToken, getRecords);
router.get("/records/:id", verifyToken, getRecord);

router.post("/records", verifyToken, verifyDoctor, createRecord);

export { router as recordsRoutes };
