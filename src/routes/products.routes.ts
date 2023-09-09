import multer from "multer";
import { Router } from "express";
import { authenticateToken } from '../middlewares/authMiddleware'
import ProductController from "../controllers/productsController";

const productsRoutes = Router();
const upload = multer();
const productController = new ProductController();

//REST
productsRoutes.get("/", productController.getAll);
productsRoutes.get("/:idOrSlug", productController.getByIdOrSlug);
productsRoutes.post("/", authenticateToken, productController.create);
productsRoutes.put("/:id", authenticateToken, productController.update);
productsRoutes.delete("/:id", authenticateToken, productController.delete);

//FORM DATA
productsRoutes.post("/image/:id", upload.array("images"), productController.uploadImage);

//CUSTOM ROUTES 
productsRoutes.get("/category/:categoryIdOrSlug", productController.getByCategory);

export default productsRoutes;
