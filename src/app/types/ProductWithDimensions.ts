import {Product} from '../models/Product';

export interface ProductWithDimensions extends Product {
  calculatedHeight: number;
}
