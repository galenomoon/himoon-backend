import { Request, Response } from "express"
import ProductUseCase from "../useCases/productUseCase";

const productUseCase = new ProductUseCase()

export default class ProductController {

  async getAll(_: Request, res: Response) {
    const products = await productUseCase.getAll()
    return res.status(200).json(products)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const product = await productUseCase.getById(Number(id))
    return res.status(200).json(product)
  }

  async create(req: Request, res: Response) {
    const { name, description, price, images, category_id } = req.body
    const newCategory = await productUseCase.create({ name, description, price, images, category_id })
    return res.status(201).json(newCategory)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, price, images, category_id } = req.body
    const product = await productUseCase.update(Number(id), { name, description, price, images, category_id })
    return res.status(200).json(product)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const products = await productUseCase.delete(Number(id))
    return res.status(200).json(products)
  }

  async getByCategory(req: Request, res: Response) {
    const { q: name } = req.query
    const { category_id } = req.params
    const products = await productUseCase.getByCategory(Number(category_id), String(name))
    return res.status(200).json(products)
  }
}