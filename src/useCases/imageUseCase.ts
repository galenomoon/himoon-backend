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
  }

  async create(productId: number, image: Express.Multer.File) {
    const product = await productUseCase.getById(productId);

    const storageRef = ref(storage, `products/${product.slug}`);

    const fileRef = ref(storageRef, image.originalname);
    const uploadTask = uploadBytesResumable(fileRef, image.buffer);
    await uploadTask;
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    return await imageModel.create({ url, productId: product.id } as Image);
  }

  async update(id: number, image: Image) {
    const isImageIdValid = await imageModel.getById(id);
    if (!isImageIdValid) throw new AppError("Image not found", 404);
    return await imageModel.update(id, image);
  }

  async delete(id: number) {
    const image = await imageModel.getById(id);
    if (!image) throw new AppError("Image not found", 404);
    return await imageModel.delete(id);
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
