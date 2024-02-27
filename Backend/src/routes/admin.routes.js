import { Router } from "express";

import { verifyToken } from "../jwt/jwt.js";
import { verifyAdmin } from "../auth/verifiyRole.js";
import {
    createDefaultAdmin,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/admin.controllers.js";

const router = Router();

router.get("/createDefaultAdmin", createDefaultAdmin);
router.get("/admin/users", verifyToken, verifyAdmin, getUsers);
router.get("/admin/users/:_id", verifyToken, verifyAdmin, getUser);

router.post("/admin/users", verifyToken, verifyAdmin, createUser);

router.put("/admin/users", verifyToken, verifyAdmin, updateUser);

router.delete("/admin/users/:_id", verifyToken, verifyAdmin, deleteUser);

export { router as adminRoutes };
