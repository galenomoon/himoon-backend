import { Category } from "../interfaces/category";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryModel {

  async getAll() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async getById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  }

  async create({ name }: Category) {
    const category = await prisma.category.create({
      data: { name }
    })
    return category
  }

  async update(id: number, { name }: Category) {
    const category = await prisma.category.update({
      where: { id },
      data: { name }
    })
    return category
  }

  async delete(id: number) {

    await prisma.product.deleteMany({
      where: { category_id: id }
    })

    await prisma.category.delete({
      where: { id }
    })

    return this.getAll()
  }
}