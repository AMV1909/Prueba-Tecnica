import { Router } from "express";
import { login, restoreSession } from "../controllers/session.controllers.js";
import { verifyToken } from "../jwt/jwt.js";

const router = Router();

router.post("/login", login);
router.get("/restore-session", verifyToken, restoreSession);

export { router as sessionRoutes };
