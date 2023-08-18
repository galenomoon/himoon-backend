import CategoryModel from "../models/categoryModel";
import { Category } from "../interfaces/category";
import { AppError } from "../errors/appError";

const categoryModel = new CategoryModel()

export default class CategoryUseCase {
  async getAll() {
    return await categoryModel.getAll()
  }

  async getById(id: number) {
    const category = await categoryModel.getById(id)
    if (!category) throw new AppError("Category not found", 404)
    return category
  }

  async create({ name }: Category) {
    if (!name) throw new AppError("Name is required")
    return await categoryModel.create({ name })
  }

  async update(id: number, { name }: Category) {
    if (!name) throw new AppError("Name is required")
    return await categoryModel.update(id, { name })
  }

  async delete(id: number) {
    const category = await categoryModel.getById(id)
    if (!category) throw new AppError("Category not found", 404)
    return await categoryModel.delete(id)
  }
}