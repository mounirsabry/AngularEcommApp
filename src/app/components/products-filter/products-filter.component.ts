import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'app-products-filter',
  standalone: false,
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent implements OnInit {

  protected productCategories: string[] = [];

  protected currentCategory: string = 'None'
  protected currentSearchTitle: string = 'None';
  protected currentMaxPrice: number | null = null;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService.getProductCategories()
      .subscribe({
        next: categories => {
          this.productCategories = categories;
        },
        error: err => {
          console.log(err);
        }
      })
  }

  applyFilters(chosenCategory: string, searchTitle: string, maxPriceString: string): void {
    const maxPrice = maxPriceString ? parseInt(maxPriceString) : null;
    if (maxPrice && maxPrice < 0) {
      return;
    }

    this.currentCategory = chosenCategory;
    this.currentSearchTitle = searchTitle;
    this.currentMaxPrice = maxPrice;
    console.log(
      `Category: ${this.currentCategory}, SearchTitle: ${this.currentSearchTitle}, MaxPrice: ${this.currentMaxPrice}`
    )

  }
}
