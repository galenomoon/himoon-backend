import { Router } from "express";

import ProductController from "../controllers/productsController";

const productsRoutes = Router();

const productController = new ProductController();

//REST
productsRoutes.get("/", productController.getAll);
productsRoutes.get("/:id", productController.getById);
productsRoutes.post("/", productController.create);
productsRoutes.put("/:id", productController.update);
productsRoutes.delete("/:id", productController.delete);

//CUSTOM ROUTES 
productsRoutes.get("/category/:category_id", productController.getByCategory);

export default productsRoutes;
