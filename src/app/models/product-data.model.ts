import { Product } from "./product.model";

export interface ProductData {
    products: Product[];
    totalItems: number;
    page: number;
    pageSize: number;
  }
  