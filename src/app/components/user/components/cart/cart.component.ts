import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  protected cart: CartItem[] = [];

  constructor(private _cartService: CartService) {
  }

  ngOnInit(): void {
    this.cart = this._cartService.getCart();
  }

  protected readonly CartItem = CartItem;

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].productId == cartItem.productId) {
          this.cart[i].quantity -= 1;
          break;
        }
      }

      this._cartService.updateCartItem(cartItem.productId, cartItem.quantity - 1);
    }
  }

  increaseQuantity(cartItem: CartItem) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].productId == cartItem.productId) {
        this.cart[i].quantity += 1;
        break;
      }
    }

    this._cartService.updateCartItem(cartItem.productId, cartItem.quantity + 1);
  }

  removeItem(productId: number) {
    let foundIndex: number = -1;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].productId == productId) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex > -1) {
      this.cart.splice(foundIndex, 1);
    }
    this._cartService.removeItemFromCart(productId);
  }
}
