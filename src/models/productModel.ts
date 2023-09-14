//interfaces
import { Product } from "../interfaces/product";

//prisma
import { PrismaClient } from "@prisma/client";

//models
import CategoryModel from "./categoryModel";

//helpers
import slugParse from "../helpers/slugParse";

const prisma = new PrismaClient();
const categoryModel = new CategoryModel();

export default class ProductModel {
  async getAll(name?: string, quantity?: number) {
    if (!name?.trim()) {
      const allProducts = await prisma.product.findMany({
        orderBy: { id: "asc" },
        include: {
          category: true,
          images: true,
        },
        take: quantity || undefined,
      });

      return allProducts;
    }

    const productsByName = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return productsByName;
  }

  async getById(id?: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, images: true },
    });
    return product;
  }

  async getBySlug(slug?: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, images: true },
    });
    return product;
  }

  async create({ name, description, price, categoryId }: Product) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        slug: slugParse(name),
      },
    });

    await categoryModel.updateCategoryCount(product.categoryId);

    return product;
  }

  async update(id: number, { name, description, price, categoryId }: Product) {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categoryId,
        slug: slugParse(name),
      },
      include: { category: true, images: true },
    });
    return product;
  }

  async delete(id: number) {
    const product = await this.getById(id);
    await prisma.image.deleteMany({
      where: { productId: id },
    });
    await prisma.product.delete({ where: { id } });
    await categoryModel.updateCategoryCount(Number(product?.categoryId));
    return this.getAll();
  }

  async getByCategoryId(categoryId: number | string, name: string | undefined) {
    if (!name)
      return await prisma.product.findMany({
        where: { categoryId: Number(categoryId) },
        include: { category: true, images: true },
      });

    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
      include: { category: true, images: true },
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
        include: { category: true, images: true },
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
      include: { category: true, images: true },
    });
  }
}
