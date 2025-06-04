import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/ProductService';
import { ImageUtils } from '../../utils/ImageUtils';
import { Product } from '../../models/Product';

interface ProductWithDimensions extends Product {
  calculatedHeight: number;
}

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  protected readonly DEFAULT_WIDTH: number = 400;

  private allProducts: Product[] = [];

  protected displayedProducts: ProductWithDimensions[] = [];
  protected isLoading: boolean = true;

  constructor(private _productService: ProductService) {
  }

  async ngOnInit(): Promise<void> {
    this._productService.getAllProducts()
      .subscribe({
        next: async (response) => {
          this.allProducts = response.products;

          this.displayedProducts = await this.loadProductWithDimensions(this.allProducts);
          this.isLoading = false;
        }, error: error => {
          console.log(error);
        }
      });
  }

  private async loadProductWithDimensions(products: Product[]): Promise<ProductWithDimensions[]> {
    return await Promise.all(
      products.map(async (product: Product): Promise<ProductWithDimensions> => {
        const imagePath: string | null = product.images[0]!;

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

  getAvailableProductsCount() {
    return this.displayedProducts.length;
  }
}
