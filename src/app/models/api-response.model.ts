import { ProductData } from "./product-data.model";


export interface ApiResponse {
    data: ProductData;
    success: boolean;
    message: string;
    errors: unknown[];
  }