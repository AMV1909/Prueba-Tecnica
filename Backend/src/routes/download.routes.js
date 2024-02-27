import { Router } from "express";

import { verifyToken } from "../jwt/jwt.js";
import { download } from "../controllers/download.controller.js";

const router = Router();

router.get("/download/:id", verifyToken, download);

export { router as downloadRoutes };
