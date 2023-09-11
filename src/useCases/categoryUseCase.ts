import CategoryModel from "../models/categoryModel";
import { Category } from "../interfaces/category";
import { AppError } from "../errors/appError";

//firebase
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config";
import { getStorage, ref, deleteObject } from "firebase/storage";

// =======================

initializeApp(config.firebaseConfig);
const storage = getStorage();
const categoryModel = new CategoryModel();

export default class CategoryUseCase {
  async getAll(slug?: string | undefined, sortBy?: string | undefined) {
    if (
      sortBy &&
      !["id", "name", "quantityProducts"].includes(sortBy) &&
      sortBy
    )
      throw new AppError("Invalid sortBy");
    return await categoryModel.getAll(slug, sortBy);
  }

  async getById(id: number) {
    const category = await categoryModel.getById(id);
    if (!category) throw new AppError("Category not found", 404);
    return category;
  }

  async create({ name }: Category) {
    if (!name) throw new AppError("Name is required");
    if (await categoryModel.getByName(name))
      throw new AppError("Category already exists", 409);
    return await categoryModel.create({ name });
  }

  async update(id: number, { name }: Category) {
    if (!name) throw new AppError("Name is required");
    return await categoryModel.update(id, { name });
  }

  async getProducts(id: number) {
    const category = await categoryModel.getById(id);
    if (!category) throw new AppError("Category not found", 404);
    return await categoryModel.getProducts(id);
  }

  async delete(id: number) {
    const category = await categoryModel.getById(id);
    if (!category) throw new AppError("Category not found", 404);

    const products = await this.getProducts(Number(category.id));

    const requests = products?.map(async (product) => {
      if (product?.images?.length > 0) {
        product.images.map(async (image) => {
          await deleteObject(
            ref(storage, `${category.id}/${product.id}/${image.filename}`)
          );
        });
      }
    });

    try {
      await Promise.all(requests);
      return await categoryModel.delete(id);
    } catch (error) {
      throw new AppError("Error on delete firebase images", 500);
    }

  }
}
