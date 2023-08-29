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

    const is_category_id_valid = await categoryModel.getById(product.category_id)

    if (!is_category_id_valid) {
      throw new AppError("Category not found", 404)
    }

    return await productModel.create(product)
  }

  async update(id: number, product: Product) {

    hasAllRequiredKeys(product)

    const is_category_id_valid = await categoryModel.getById(product.category_id)

    if (!is_category_id_valid) {
      throw new AppError("Category not found", 404)
    }

    return await productModel.update(id, product)
  }

  async delete(id: number) {
    const product = await productModel.getById(id)
    if (!product) throw new AppError("Product not found", 404)
    return await productModel.delete(id)
  }

  async getByCategory(category_id: number, name: string) {
    if (!category_id) throw new AppError("category_id is required", 400)
    const products = await productModel.getByCategory(category_id, name)
    return products
  }
}