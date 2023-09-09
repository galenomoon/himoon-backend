import multer from "multer";
import { Router } from "express";
import { authenticateToken } from '../middlewares/authMiddleware'
import ImagesController from "../controllers/imagesController";

const imagesRoutes = Router();
const upload = multer();
const imagesController = new ImagesController();

//REST
imagesRoutes.get("/", imagesController.getAll);
imagesRoutes.get("/:id", imagesController.getById);
imagesRoutes.post("/:productId", upload.single('image'), imagesController.create);
imagesRoutes.put("/:id", authenticateToken, imagesController.update);
imagesRoutes.delete("/:id", upload.single('image'), imagesController.delete);

// CUSTOM ROUTES
imagesRoutes.get("/product/:productId", imagesController.getByProductId);
imagesRoutes.get("/product/slug/:productSlug", imagesController.getByProductSlug);

export default imagesRoutes;
