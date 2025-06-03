import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/ProductService';
import {ProductWithDimensions} from '../../types/ProductWithDimensions';
import {ImageUtils} from '../../utils/ImageUtils';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly DEFAULT_WIDTH: number = 400;

  protected displayedProducts: ProductWithDimensions[] = [];
  protected isLoading: boolean = true;

  private productService: ProductService = new ProductService();
  private readonly allProducts: Product[];

  constructor() {
    this.allProducts = this.productService.getAllProducts();
  }

  async ngOnInit(): Promise<void> {
    this.displayedProducts = await this.loadProductWithDimensions(this.allProducts);
    this.isLoading = false;
  }

  private async loadProductWithDimensions(products: Product[]): Promise<ProductWithDimensions[]> {
    return await Promise.all(
      products.map(async (product: Product): Promise<ProductWithDimensions> => {
        const imagePath: string | null = product.imagePath;

        if (imagePath == null) {
          return {
            ...product,
            calculatedHeight: 0
          };
        }

        try {
          const imageElement = await ImageUtils.getImage(imagePath);
          const height: number = ImageUtils.calculateHeightPreservingAspectRatio(imageElement, this.DEFAULT_WIDTH);

          return {
            ...product,
            calculatedHeight: height
          };
        } catch (error) {
          console.error(`Failed to load image for product ${product.title}:`, error);
          return {
            ...product,
            calculatedHeight: 0
          };
        }
      })
    );
  }
}
