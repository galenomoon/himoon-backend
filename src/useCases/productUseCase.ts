import ProductModel from '../models/productModel';
import CategoryModel from '../models/categoryModel';
import { Product } from '../interfaces/product';
import { AppError } from '../errors/appError';
import { hasAllRequiredKeys } from '../errors/hasAllRequiredKeys';

const productModel = new ProductModel()
const categoryModel = new CategoryModel()

export default class ProductUseCase {
  
  async getAll() {
    return await productModel.getAll()
  }

  async getById(id: number) {
    const product = await productModel.getById(id)
    if (!product) throw new AppError("Product not found", 404)
    return product
  }

  async create({ name, description, price, images, category_id }: Product) {
   
    hasAllRequiredKeys({ name, description, price, category_id })

    if (!Array.isArray(images)) {
      throw new AppError("images must be an array");
    }

    const is_category_id_valid = await categoryModel.getById(category_id)

    if (!is_category_id_valid) {
      throw new AppError("Category not found", 404)
    }

    return await productModel.create({ name, description, price, images, category_id })
  }

  async update(id: number, { name, description, price, images, category_id }: Product) {
    
    hasAllRequiredKeys({ name, description, price, category_id })

    const is_category_id_valid = await categoryModel.getById(category_id)

    if (!is_category_id_valid) {
      throw new AppError("Category not found", 404)
    }

    return await productModel.update(id, { name, description, price, images, category_id })
  }

  async delete(id: number) {
    return await productModel.delete(id)
  }
}