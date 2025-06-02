import { Component } from '@angular/core';
import { ProductCategory } from '../../models/ProductCategory';

@Component({
  selector: 'app-products-filter',
  standalone: false,
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent {

  protected totalNumberOfProducts: number = 0;
  protected readonly ProductCategory:typeof ProductCategory = ProductCategory;

  protected currentCategory: ProductCategory = ProductCategory.NONE;
  protected currentSearchTitle: string = "None";
  protected currentMaxPrice: number | null = null;

  applyFilters(chosenCategory: string, searchTitle: string, maxPriceString: string): void {
    const maxPrice = maxPriceString ? parseInt(maxPriceString) : null;
    if (maxPrice && maxPrice < 0) {
      return;
    }

    this.currentCategory = chosenCategory as ProductCategory;
    this.currentSearchTitle = searchTitle;
    this.currentMaxPrice = maxPrice;
    console.log(
      `Category: ${this.currentCategory}, SearchTitle: ${this.currentSearchTitle}, MaxPrice: ${this.currentMaxPrice}`
    )

  }
}
