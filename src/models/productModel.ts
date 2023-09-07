import { Product } from "../interfaces/product";
import { PrismaClient } from "@prisma/client";
import CategoryModel from "./categoryModel";

const prisma = new PrismaClient();
const categoryModel = new CategoryModel();

export default class ProductModel {
  async getAll(name?: string, slug?: string, quantity?: number) {
    if (slug) {
      return await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
      });
    }

    if (!name?.trim())
      return await prisma.product.findMany({
        orderBy: { id: "asc" },
        include: {
          category: true,
        },
        take: quantity || undefined,
      });

    return await prisma.product.findMany({
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
  }

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async create({ name, description, price, images, categoryId }: Product) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images,
        categoryId,
        slug: name.toLowerCase().replace(/ /g, "-"),
      },
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

  async getByCategoryId(categoryId: number | string, name: string | undefined) {
    if (!name)
      return await prisma.product.findMany({
        where: { categoryId: Number(categoryId) },
        include: { category: true },
      });

    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
      include: { category: true },
      where: {
        categoryId: Number(categoryId),
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return products;
  }

  async getByCategorySlug(categorySlug: string, name: string | undefined) {

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug as string },
    });
    
    if (!category) return null;

    if (!name) {
      return await prisma.product.findMany({
        where: { categoryId: category.id },
        include: { category: true },
      });
    }

    return await prisma.product.findMany({
      where: {
        categoryId: category.id,
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: { category: true },
    });
  }
}
