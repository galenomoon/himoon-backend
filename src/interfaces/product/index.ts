

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  images?: string[] | Express.Multer.File[];
  categoryId: number;
}