import { Product } from "../interfaces/product";
import { PrismaClient } from "@prisma/client";
import CategoryModel from "./categoryModel";

const prisma = new PrismaClient();
const categoryModel = new CategoryModel();

export default class ProductModel {
  async getAll(name?: string) {
    if (!name)
      return await prisma.product.findMany({
        orderBy: { id: "asc" },
        include: {
          category: true,
        },
      });

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
      },
    });

    return products;
  }

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async create({ name, description, price, images, categoryId }: Product) {
    const product = await prisma.product.create({
      data: { name, description, price, images, categoryId },
    });

    await categoryModel.updateCategoryCount(product.categoryId);

    return product;
  }

  async update(
    id: number,
    { name, description, price, images, categoryId }: Product
  ) {
    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price, images, categoryId },
    });
    return product;
  }

  async delete(id: number) {
    const product = await this.getById(id);
    await prisma.product.delete({ where: { id } });
    await categoryModel.updateCategoryCount(Number(product?.categoryId));
    return this.getAll();
  }

  async getByCategory(categoryId: number, name: string) {
    if (!name)
      return await prisma.product.findMany({
        where: { categoryId },
      });

    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
      where: {
        categoryId,
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return products;
  }
}
