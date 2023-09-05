import CategoryModel from "../models/categoryModel";
import { Category } from "../interfaces/category";
import { AppError } from "../errors/appError";

const categoryModel = new CategoryModel();

export default class CategoryUseCase {
  async getAll(slug?: string | undefined, sortBy?: string | undefined) {
    if (sortBy && !["id", "name", "quantityProducts"].includes(sortBy) && sortBy)
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

  async delete(id: number) {
    const category = await categoryModel.getById(id);
    if (!category) throw new AppError("Category not found", 404);
    return await categoryModel.delete(id);
  }
}
