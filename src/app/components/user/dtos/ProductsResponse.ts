import { Product } from '../models/Product';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
