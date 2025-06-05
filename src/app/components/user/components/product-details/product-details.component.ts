import { Component, OnInit } from '@angular/core';
import { ProductWithDimensions } from '../../types/ProductWithDimensions';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductUtils } from '../../utils/ProductUtils';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  protected readonly DEFAULT_WIDTH = 400;

  protected product: ProductWithDimensions | null = null;

  constructor(private _productService: ProductService,
              private _cartService: CartService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(param => {
      let idString: string | null = param.get('id');
      if (idString == null) {
        this._router.navigateByUrl('/products').then(_ => {});
        return;
      }

      let id: number = Number.parseInt(idString);

      this._productService.getProductById(id).subscribe({
        next: async product => {
          this.product = await ProductUtils.getProductWithDimensions(product, this.DEFAULT_WIDTH);
        },
        error: error => {
          console.error(error);
        }
      });
    });


  }

  addToCart(product: ProductWithDimensions) {
    this._cartService.addItemToCart(product.id);
    alert(`Quantity 1 of the product with title ${product.title} has been added to the cart`);
  }
}
