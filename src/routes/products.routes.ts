import { Router } from "express";

import ProductController from "../controllers/productsController";

const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.get("/", productController.getAll);
productsRoutes.get("/:id", productController.getById);
productsRoutes.post("/", productController.create);
productsRoutes.put("/:id", productController.update);
productsRoutes.delete("/:id", productController.delete);

export default productsRoutes;
