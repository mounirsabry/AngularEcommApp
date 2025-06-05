import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _localStorageService: LocalStorageService) { }

  getCart(): CartItem[] {
    return this._localStorageService.getCart();
  }

  addItemToCart(id: number, quantity: number = 1): void {
    const cart: CartItem[] = this._localStorageService.getCart();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === id) {
        cart[i].quantity += quantity;
        this._localStorageService.saveCart(cart);
        return;
      }
    }

    cart.push(new CartItem(id, quantity));
    this._localStorageService.saveCart(cart);
  }

  updateCartItem(id: number, newQuantity: number): void {
    const cart: CartItem[] = this._localStorageService.getCart();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === id) {
        cart[i].quantity = newQuantity;
        this._localStorageService.saveCart(cart);
        return;
      }
    }

    throw new Error('No cart item found for product id ' + id);
  }

  removeItemFromCart(id: number): boolean {
    const cart: CartItem[] = this._localStorageService.getCart();
    let foundIndex: number = -1;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId == id) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex == -1) {
      return false;
    }

    cart.splice(foundIndex, 1);
    this._localStorageService.saveCart(cart);
    return true;
  }
}
