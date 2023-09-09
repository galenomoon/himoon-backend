import { Product } from "../product";

export interface Image {
  id?: number;
  url: string;
  productId: number;
  product?: Product;
  filename?: string;
}
