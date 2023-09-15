import { Request, Response } from "express";
import ImageUseCase from "../useCases/imageUseCase";

const imageUseCase = new ImageUseCase();

export default class ImagesController {
  async getAll(_: Request, res: Response) {
    const images = await imageUseCase.getAll();
    res.status(200).json(images);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const image = await imageUseCase.getById(Number(id));
    res.status(200).json(image);
  }

  async create(req: Request, res: Response) {
    const { productId } = req.params;
    const image = req.file;
    const imagesCreated = await imageUseCase.create(Number(productId), image as unknown as Express.Multer.File);
    res.status(201).json(imagesCreated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const imageDeleted = await imageUseCase.delete(Number(id));
    res.status(200).json(imageDeleted);
  }

  async getByProductId(req: Request, res: Response) {
    const { productId } = req.params;
    const images = await imageUseCase.getByProductId(Number(productId));
    res.status(200).json(images);
  }

  async getByProductSlug(req: Request, res: Response) {
    const { productSlug } = req.params;
    const images = await imageUseCase.getByProductSlug(productSlug);
    res.status(200).json(images);
  }
}
