import { Product } from "../interfaces/product";
import { PrismaClient } from "@prisma/client";
import CategoryModel from "./categoryModel";

const prisma = new PrismaClient();
const categoryModel = new CategoryModel()

export default class ProductModel {

  async getAll() {
    const products = await prisma.product.findMany();
    return products;
  }

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async create({ name, description, price, images, category_id }: Product) {
    const product = await prisma.product.create({
      data: { name, description, price, images, category_id },
    })

    await categoryModel.updateCategoryCount(product.category_id)

    return product
  }

  async update(id: number, { name, description, price, images, category_id }: Product) {
    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price, images, category_id },
    })
    return product
  }

  async delete(id: number) {
    const product = await this.getById(id)
    await prisma.product.delete({ where: { id } })
    await categoryModel.updateCategoryCount(Number(product?.category_id))
    return this.getAll()
  }

  async getByCategory(category_id: number, name: string) {
    if (!name) return await prisma.product.findMany({
      where: { category_id }
    })

    const products = await prisma.product.findMany({
      where: {
        category_id,
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })
    return products
  }

  async getByName(name: string) {
    if (!name) {
      const products = this.getAll()
      return products
    }

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })
    return products
  }
}