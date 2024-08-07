import { Router } from "express";
import { signup, login, logoutUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticateToken, logoutUser);

export default router;
