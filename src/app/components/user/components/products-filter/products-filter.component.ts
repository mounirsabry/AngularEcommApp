import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductFilterService } from '../../services/product-filter.service';
import { FiltersClass } from '../../types/FiltersClass';

@Component({
  selector: 'user-products-filter',
  standalone: false,
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent implements OnInit {

  protected productCategories: string[] = [];

  protected currentCategory: string | null = null;
  protected currentSearchTitle: string | null = null;
  protected currentMaxPrice: number | null = null;

  constructor(
    private _productService: ProductService,
    private _productFilterService: ProductFilterService
  ) {}

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

    // Normalize the values all and empty strings to null for cleaner filtering.
    const normalizedCategory = (chosenCategory === 'All') ? null : chosenCategory;

    const normalizedTitle = searchTitle.trim();

    console.log(
      `Category: ${normalizedCategory}, SearchTitle: ${normalizedTitle}, MaxPrice: ${maxPrice}`
    );

    // Create a new FiltersClass instance to ensure change detection
    const filtersClass: FiltersClass = new FiltersClass();
    filtersClass.categoryFilter = normalizedCategory;
    filtersClass.titleFilter = normalizedTitle;
    filtersClass.maxPriceFilter = maxPrice;

    this._productFilterService.setFilters(filtersClass);

    this.currentCategory = normalizedCategory;
    this.currentSearchTitle = normalizedTitle;
    this.currentMaxPrice = maxPrice;
  }

  clearFilters(): void {
    // Reset filters to null values
    const filtersClass: FiltersClass = new FiltersClass();
    this._productFilterService.setFilters(filtersClass);

    this.currentCategory = null;
    this.currentSearchTitle = null;
    this.currentMaxPrice = null;
  }
}
