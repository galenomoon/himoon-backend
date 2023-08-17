import { Router } from "express";
import CategoryController from "../controllers/categoriesController";

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.get("/", categoryController.getAll);
categoriesRoutes.get("/:id", categoryController.getById);
categoriesRoutes.post("/", categoryController.create);
categoriesRoutes.put("/:id", categoryController.update);
categoriesRoutes.delete("/:id", categoryController.delete);

export default categoriesRoutes;
