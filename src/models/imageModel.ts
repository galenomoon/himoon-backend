import { Image } from "../interfaces/image";
import { PrismaClient } from "@prisma/client";
import ProductModel from "./productModel";

const prisma = new PrismaClient();
const productModel = new ProductModel();

export default class ImageModel {
  async getAll() {
    return await prisma.image.findMany({
      orderBy: { id: "asc" },
      include: { product: true },
    });
  }

  async getById(id?: number) {
    return await prisma.image.findUnique({
      where: { id },
      include: { product: { include: { category: true } } },
    });
  }

  async create({ url, productId, filename }: Image) {
    return await prisma.image.create({
      data: {
        url,
        productId,
        filename: filename || "",
      },
    });
  }

  async delete(id: number) {
    const image = await this.getById(id);
    await prisma.image.delete({ where: { id } });
    return image;
  }

  async getByProductId(productId: number | string) {
    return await prisma.image.findMany({
      where: { productId: Number(productId) },
      include: { product: true },
    });
  }

  async getByProductSlug(productSlug: string) {
    const product = await productModel.getBySlug(productSlug);
    if (!product?.id) return null;

    return await prisma.image.findMany({
      where: { productId: product.id },
      include: { product: true },
    });
  }
}
