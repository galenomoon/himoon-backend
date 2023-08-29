import { Router } from "express";
import AuthController from "../controllers/authController";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.get("/", (_, res) => res.status(200).json({ message: "OK!" }));
authRoutes.post("/login", authController.login)
authRoutes.post("/register", authController.register)

export default authRoutes;
