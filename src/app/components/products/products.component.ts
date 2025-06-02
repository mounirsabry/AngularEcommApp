import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/ProductService';
import {ImageDimensions} from '../../types/ImageDimensions';
import {ProductWithDimensions} from '../../types/ProductWithDimensions';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private readonly DEFAULT_WIDTH:400 = 400 as const;
  private readonly DEFAULT_HEIGHT:300 = 300 as const;

  protected displayedProducts: ProductWithDimensions[] = [];
  protected isLoading: boolean = true;

  private ProductService: ProductService = new ProductService();
  private readonly products: Product[];

  constructor() {
     this.products = this.ProductService.getAllProducts();
  }

  imageDimensions: Map<string, ImageDimensions> = new Map();

  calculateImageHeight(imagePath: string | null): Promise<number> {
    if (imagePath == null) {
      return new Promise((resolve) => resolve(this.DEFAULT_HEIGHT));
    }

    return new Promise((resolve) => {
      const img = new Image();

      img.onload = (): void => {
        const aspectRatio: number = img.height / img.width;
        const height: number = Math.round(this.DEFAULT_WIDTH * aspectRatio); // 400 is your desired width
        this.imageDimensions.set(imagePath, { width: this.DEFAULT_WIDTH, height });
        resolve(height);
      };

      img.onerror = (): void => resolve(this.DEFAULT_HEIGHT);
      img.src = imagePath;
    });
  }

  async ngOnInit(): Promise<void> {
    // Calculate all dimensions first
    this.displayedProducts = await Promise.all(
      this.products.map(async (product) => ({
        ...product,
        calculatedHeight: await this.calculateImageHeight(product.imagePath)
      }))
    );

    this.isLoading = false;
  }

}
