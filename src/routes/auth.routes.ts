import { Router } from "express";
import AuthController from "../controllers/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.get("/current_user", authenticateToken, authController.currentUser)
authRoutes.post("/login", authController.login)
authRoutes.post("/register", authController.register)

export default authRoutes;
