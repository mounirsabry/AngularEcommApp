import {Product} from '../models/Product';
import {ProductCategory} from '../models/ProductCategory';

export class ProductService {
  private readonly products: Product[] = [];

  constructor() {
    this.products = [
      {
        id: 1,
        title: 'Coffee 1',
        stock: 10,
        category: ProductCategory.COFFEE,
        price: 10,
        imagePath: 'assets/images/coffee1.jpg'
      },
      {
        id: 2,
        title: 'Tea 1',
        stock: 10,
        category: ProductCategory.TEA,
        price: 10,
        imagePath: 'assets/images/tea1.jpg'
      },
      {
        id: 3,
        title: 'Tea 2',
        stock: 10,
        category: ProductCategory.TEA,
        price: 10,
        imagePath: 'assets/images/tea2.jpg'
      }
    ]
  }

  getAllProducts() : Product[] {
    return this.products;
  }
}
