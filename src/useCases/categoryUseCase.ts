import CategoryModel from "../models/categoryModel";
import { Category } from "../interfaces/category";

const categoryModel = new CategoryModel()

export default class CategoryUseCase {
  async getAll() {
    return await categoryModel.getAll()
  }

  async getById(id: number) {
    const category = await categoryModel.getById(id)
    if (!category) throw new Error("Category not found")
    return category
  }

  async create({ name }: Category) {
    if (!name) throw new Error("Name is required")
    return await categoryModel.create({ name })
  }

  async update(id: number, { name }: Category) {
    if (!name) throw new Error("Name is required")
    return await categoryModel.update(id, { name })
  }

  async delete(id: number) {
    return await categoryModel.delete(id)
  }
}