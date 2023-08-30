import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import CategoryController from "../controllers/categoriesController";

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.get("/", categoryController.getAll);
categoriesRoutes.get("/:id", categoryController.getById);
categoriesRoutes.post("/", authenticateToken, categoryController.create);
categoriesRoutes.put("/:id", authenticateToken, categoryController.update);
categoriesRoutes.delete("/:id", authenticateToken, categoryController.delete);

export default categoriesRoutes;
