import {ProductCategory} from './ProductCategory';

export class Product {
  id: number;
  title: string;
  stock: number;
  category: ProductCategory;
  price: number;
  imagePath: string | null = null;

  constructor(id: number,
              title: string,
              stock: number,
              category: ProductCategory,
              price: number,
              imagePath: string | null = null) {
    this.id = id;
    this.title = title;
    this.stock = stock;
    this.category = category;
    this.price = price;
    this.imagePath = imagePath;
  }
}
