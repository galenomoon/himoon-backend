import { Request, Response } from "express";
import ProductUseCase from "../useCases/productUseCase";

const productUseCase = new ProductUseCase();

export default class ProductController {
  async getAll(req: Request, res: Response) {
    const { q: name, quantity, page } = req.query;
    const products = await productUseCase.getAll(
      name as undefined,
      Number(quantity),
      Number(page)
    );
    return res.status(200).json(products);
  }

  async getByIdOrSlug(req: Request, res: Response) {
    const { idOrSlug } = req.params;
    const isSlug = isNaN(Number(idOrSlug));
    if (isSlug) {
      const productsBySlug = await productUseCase.getBySlug(idOrSlug);
      return res.status(200).json(productsBySlug);
    }

    const productsById = await productUseCase.getById(Number(idOrSlug));
    return res.status(200).json(productsById);
  }

  async create(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body;
    const newProduct = await productUseCase.create({
      name,
      description,
      price,
      categoryId,
    });
    return res.status(201).json(newProduct);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, images, categoryId } = req.body;
    const product = await productUseCase.update(Number(id), {
      name,
      description,
      price,
      images,
      categoryId,
    });
    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const products = await productUseCase.delete(Number(id));
    return res.status(200).json(products);
  }

  async getByCategory(req: Request, res: Response) {
    const { q: name, page } = req.query;
    const { categoryIdOrSlug } = req.params;
    const isSlug = isNaN(Number(categoryIdOrSlug));

    if (isSlug) {
      const products = await productUseCase.getByCategorySlug(
        categoryIdOrSlug,
        name as undefined,
        Number(page)
      );
      return res.status(200).json(products);
    }

    const products = await productUseCase.getByCategoryId(
      Number(categoryIdOrSlug),
      name as undefined,
      Number(page)
    );
    return res.status(200).json(products);
  }
}
