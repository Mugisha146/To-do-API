import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/users", authenticateToken, getUsers);
router.get("/users/me", authenticateToken, getUserById);
router.patch("/users/me", authenticateToken, updateUser);
router.delete("/users/me", authenticateToken, deleteUser);

export default router;
