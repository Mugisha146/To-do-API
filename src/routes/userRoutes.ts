import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateToken, restrictTo } from "../middleware/auth";

const router = Router();

router.get("/users", authenticateToken, restrictTo(), getUsers);
router.get("/user/:id", authenticateToken, getUserById);
router.patch("/user/:id", authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken,restrictTo(), deleteUser);

export default router;
