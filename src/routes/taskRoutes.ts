import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/tasks", authenticateToken, getTasks);
router.post("/tasks", authenticateToken, createTask);
router.patch("/tasks/:id", authenticateToken, updateTask);
router.delete("/tasks/:id", authenticateToken, deleteTask);

export default router;
