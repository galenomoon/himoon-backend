import { AppError } from "../errors/appError";
import { Image } from "../interfaces/image";
import ImageModel from "../models/imageModel";
import ProductUseCase from "./productUseCase";

//firebase
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

initializeApp(config.firebaseConfig);
const storage = getStorage();
const imageModel = new ImageModel();
const productUseCase = new ProductUseCase();

export default class ImageUseCase {
  async getAll() {
    return await imageModel.getAll();
  }

  async getById(id?: number) {
    const image = await imageModel.getById(id);
    if (!image) throw new AppError("Image not found", 404);
    return image;
  }

  async create(productId: number, image: Express.Multer.File) {
    const product = await productUseCase.getById(productId);

    try {
      const storageRef = ref(
        storage,
        `/${product?.category?.id}/${product?.id}`
      );
      const fileRef = ref(storageRef, image.originalname);
      const uploadTask = uploadBytesResumable(fileRef, image.buffer);
      await uploadTask;
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      const filename = uploadTask.snapshot.ref.name;

      return await imageModel.create({
        url,
        productId: product.id,
        filename,
      } as Image);
    } catch (error) {
      throw new AppError(`Error uploading image: ${error}`, 500);
    }
  }

  async delete(id: number) {
    const image = await imageModel.getById(id);
    if (!image) throw new AppError("Image not found", 404);

    const storageRef = ref(
      storage,
      `/${image?.product?.category?.id}/${image?.product?.id}`
    );
    const fileRef = ref(storageRef, image.filename || "");
    try {
      await deleteObject(fileRef);
      await imageModel.delete(id);
    } catch (error) {
      throw new AppError("Error deleting image", 500);
    }
  }

  async getByProductId(productId: number | string) {
    await productUseCase.getById(Number(productId));
    const images = await imageModel.getByProductId(productId);
    if (!images) throw new AppError("Image not found", 404);
    return images;
  }

  async getByProductSlug(productSlug: string) {
    const images = await imageModel.getByProductSlug(productSlug);
    if (!images) throw new AppError("Image not found", 404);
    return images;
  }
}
