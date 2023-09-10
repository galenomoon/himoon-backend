//models
import ProductModel from "../models/productModel";
import CategoryModel from "../models/categoryModel";

//types
import { Product } from "../interfaces/product";

//erros
import { AppError } from "../errors/appError";
import { hasAllRequiredKeys } from "../errors/hasAllRequiredKeys";

//utils
import { paginatedResults } from "../utils/paginatedResults";

//firebase
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config";
import { getStorage, ref, deleteObject } from "firebase/storage";

// =======================

initializeApp(config.firebaseConfig);
const storage = getStorage();
const productModel = new ProductModel();
const categoryModel = new CategoryModel();

export default class ProductUseCase {
  async getAll(name?: string, quantity?: number, page?: number) {
    const products = await productModel.getAll(name, quantity);
    if (!products) throw new AppError("Product not found", 404);
    return paginatedResults(page, products as []);
  }

  async create(product: Product) {
    hasAllRequiredKeys(product);

    const isCategoryIdValid = await categoryModel.getById(product.categoryId);

    if (!isCategoryIdValid) {
      throw new AppError("Category not found", 404);
    }

    return await productModel.create(product);
  }

  async update(id: number, product: Product) {
    hasAllRequiredKeys(product);

    const isCategoryIdValid = await categoryModel.getById(product.categoryId);

    if (!isCategoryIdValid) {
      throw new AppError("Category not found", 404);
    }

    return await productModel.update(id, product);
  }

  async delete(id: number) {
    const product = await productModel.getById(id);
    if (!product) throw new AppError("Product not found", 404);

    const storageRef = ref(storage, `${product.category.id}/${product.id}`);
    const deleteImages = product.images.map(async (image) => {
      const fileRef = ref(storageRef, image.filename);
      await deleteObject(fileRef);
    });

    await Promise.all(deleteImages);

    return await productModel.delete(id);
  }

  async getBySlug(slug: string) {
    if (!slug) throw new AppError("slug is required", 400);
    const product = await productModel.getBySlug(slug);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  async getById(id: number) {
    if (!id) throw new AppError("id is required", 400);
    const product = await productModel.getById(id);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  async getByCategoryId(
    categoryId: number,
    name: string | undefined,
    page?: number
  ) {
    if (!categoryId) throw new AppError("categoryId is required", 400);

    const isCategoryIdValid = await categoryModel.getById(categoryId);

    if (!isCategoryIdValid) {
      throw new AppError("Category not found", 404);
    }

    const products = await productModel.getByCategoryId(categoryId, name);
    return paginatedResults(page, products as []);
  }

  async getByCategorySlug(
    categorySlug: string,
    name: string | undefined,
    page?: number
  ) {
    if (!categorySlug) throw new AppError("categorySlug is required", 400);
    const products = await productModel.getByCategorySlug(categorySlug, name);
    if (products === null) throw new AppError("Category not found", 404);

    return paginatedResults(page, products as []);
  }
}
