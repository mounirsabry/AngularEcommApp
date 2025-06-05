import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly CART_ENTRY = 'cart';

  constructor() {
    localStorage.setItem(this.CART_ENTRY, JSON.stringify([]));
  }

  getCart(): CartItem[] {
    let cartItemArrayString: string | null = localStorage.getItem(this.CART_ENTRY);
    if (cartItemArrayString == null) {
      throw new Error(this.CART_ENTRY + ' is not saved');
    }

    if (cartItemArrayString == '') {
      return [];
    }

    return JSON.parse(cartItemArrayString);
  }

  saveCart(cart: CartItem[]) {
    localStorage.setItem(this.CART_ENTRY, JSON.stringify(cart));
  }
}
