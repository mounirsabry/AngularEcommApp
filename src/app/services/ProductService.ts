import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsResponse } from '../dtos/ProductsResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) {}

  getProductCategories(): Observable<string[]> {
    return this._httpClient.get<string[]>('https://dummyjson.com/products/category-list');
  }

  getAllProducts(): Observable<ProductsResponse> {
    return this._httpClient.get<ProductsResponse>('https://dummyjson.com/products');
  }
}
