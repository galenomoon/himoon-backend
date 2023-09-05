import ProductModel from '../models/productModel';
import CategoryModel from '../models/categoryModel';
import { Product } from '../interfaces/product';
import { AppError } from '../errors/appError';
import { hasAllRequiredKeys } from '../errors/hasAllRequiredKeys';

const productModel = new ProductModel()
const categoryModel = new CategoryModel()

export default class ProductUseCase {

  async getAll(name: string) {
    return await productModel.getAll(name)
  }

  async getById(id: number) {
    const product = await productModel.getById(id)
    if (!product) throw new AppError("Product not found", 404)
    return product
  }

  async create(product: Product) {

    hasAllRequiredKeys(product)

    if (!Array.isArray(product.images)) {
      throw new AppError("images must be an array");
    }

    const isCategoryIdValid = await categoryModel.getById(product.categoryId)

    if (!isCategoryIdValid) {
      throw new AppError("Category not found", 404)
    }

    return await productModel.create(product)
  }

  async update(id: number, product: Product) {

    hasAllRequiredKeys(product)

    const isCategoryIdValid = await categoryModel.getById(product.categoryId)

    if (!isCategoryIdValid) {
      throw new AppError("Category not found", 404)
    }

    return await productModel.update(id, product)
  }

  async delete(id: number) {
    const product = await productModel.getById(id)
    if (!product) throw new AppError("Product not found", 404)
    return await productModel.delete(id)
  }

  async getByCategory(categoryId: number, name: string) {
    if (!categoryId) throw new AppError("categoryId is required", 400)
    const products = await productModel.getByCategory(categoryId, name)
    return products
  }
}