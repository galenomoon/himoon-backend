import { Category } from "../interfaces/category";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryModel {
  async getAll(slug?: string | undefined, sortBy?: string | undefined) {

    if (!slug) {
      const categories = await prisma.category.findMany({
        orderBy: { [sortBy || "id"]: "asc" }
      });
      return categories;
    }
    const categories = await prisma.category.findUnique({
      where: { slug },
    });

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
      data: {
        name,
        quantityProducts: 0,
        slug: name.toLowerCase().replace(/ /g, "-"),
      },
    });
    return category;
  }

  async updateCategoryCount(id: number) {
    const productsLength = await prisma.product.count({
      where: { category_id: id },
    });

    await prisma.category.update({
      where: { id },
      data: { quantityProducts: productsLength },
    });
  }

  async getByName(name: string) {
    const category = await prisma.category.findUnique({
      where: { name },
    });
    return category;
  }

  async update(id: number, { name }: Category) {
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    return category;
  }

  async delete(id: number) {
    await prisma.product.deleteMany({
      where: { category_id: id },
    });

    await prisma.category.delete({
      where: { id },
    });

    return this.getAll();
  }
}
