import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../dtos/ProductsResponse';

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
