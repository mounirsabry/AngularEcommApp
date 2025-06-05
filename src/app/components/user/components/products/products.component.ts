import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { ProductWithDimensions } from '../../types/ProductWithDimensions';
import { ProductUtils } from '../../utils/ProductUtils';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'user-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  protected readonly DEFAULT_WIDTH: number = 400;

  private allProducts: Product[] = [];

  protected displayableProducts: ProductWithDimensions[] = [];
  protected isLoading: boolean = true;

  constructor(private _productService: ProductService,
              private _cartService: CartService,
              private _router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this._productService.getAllProducts()
      .subscribe({
        next: async (response) => {
          this.allProducts = response.products;

          this.displayableProducts = await this.loadProductWithDimensions(this.allProducts);
          this.isLoading = false;
        }, error: error => {
          console.log(error);
        }
      });
  }

  private async loadProductWithDimensions(products: Product[]): Promise<ProductWithDimensions[]> {
    return await Promise.all(
      products.map(async (product: Product): Promise<ProductWithDimensions> =>
        ProductUtils.getProductWithDimensions(product, this.DEFAULT_WIDTH))
    );
  }

  getAvailableProductsCount() {
    return this.displayableProducts.length;
  }

  navigateToProduct(id: number) {
    this._router.navigate([`/user/product/${id}`]).then(_ => {});
  }

  addToCart(product: ProductWithDimensions) {
    this._cartService.addItemToCart(product.id);
    alert(`Quantity 1 of the product with title ${product.title} has been added to the cart`);
  }
}
