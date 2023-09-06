import { Request, Response } from "express";
import ProductUseCase from "../useCases/productUseCase";

const productUseCase = new ProductUseCase();

export default class ProductController {
  async getAll(req: Request, res: Response) {
    const { q: name, slug } = req.query;
    const products = await productUseCase.getAll(
      String(name),
      slug as undefined
    );
    return res.status(200).json(products);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productUseCase.getById(Number(id));
    return res.status(200).json(product);
  }

  async create(req: Request, res: Response) {
    const { name, description, price, images, categoryId } = req.body;
    const newProduct = await productUseCase.create({
      name,
      description,
      price,
      images,
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
    const { q: name } = req.query;
    const { categoryIdOrSlug } = req.params;

    if (isNaN(Number(categoryIdOrSlug))) {
      const products = await productUseCase.getByCategorySlug(
        categoryIdOrSlug,
        String(name)
      );
      return res.status(200).json(products);
    }

    const products = await productUseCase.getByCategoryId(
      Number(categoryIdOrSlug),
      String(name)
    );
    return res.status(200).json(products);
  }
}
