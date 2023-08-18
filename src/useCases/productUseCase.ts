import ProductModel from '../models/productModel';
import { Product } from '../interfaces/product';
import CategoryModel from '../models/categoryModel';

const productModel = new ProductModel()
const categoryModel = new CategoryModel()

export default class ProductUseCase {
  async getAll() {
    return await productModel.getAll()
  }

  async getById(id: number) {
    const product = await productModel.getById(id)
    if (!product) throw new Error("Product not found")
    return product
  }

  async create({ name, description, price, images, category_id }: Product) {
    if (!name) throw new Error("name is required")
    if (!description) throw new Error("description is required")
    if (!price) throw new Error("price is required")

    if (!Array.isArray(images)) throw new Error("images must to be an array")
    if (!category_id) throw new Error("category_id is required")

    const is_category_id_valid = await categoryModel.getById(category_id)
    if (!is_category_id_valid) throw new Error("Category not found")

    return await productModel.create({ name, description, price, images, category_id })
  }

  async update(id: number, { name, description, price, images, category_id }: Product) {
    if (!name) throw new Error("Name is required")

    return await productModel.update(id, { name, description, price, images, category_id })
  }

  async delete(id: number) {
    return await productModel.delete(id)
  }
}