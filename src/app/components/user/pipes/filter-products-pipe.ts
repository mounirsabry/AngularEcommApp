import { Pipe, PipeTransform } from '@angular/core';
import { ProductFilterService } from '../services/product-filter.service';
import { FiltersClass } from '../types/FiltersClass';
import { ProductWithDimensions } from '../types/ProductWithDimensions';

@Pipe({
  name: 'filterProducts',
  standalone: false,
  pure: false // This ensures the pipe runs when the service data changes
})
export class FilterProductsPipe implements PipeTransform {

  constructor(private _productFilterService: ProductFilterService) {}

  transform(allProducts: ProductWithDimensions[]): ProductWithDimensions[] {
    if (!allProducts || allProducts.length === 0) {
      return allProducts;
    }

    const filtersClass: FiltersClass = this._productFilterService.getFilters();

    return allProducts.filter(product => {
      // Category filter - handle 'All', null, and actual category values
      const categoryMatch: boolean =
        filtersClass.categoryFilter == null ||
        filtersClass.categoryFilter.toLowerCase() === 'all' ||
        product.category === filtersClass.categoryFilter;

      // Title filter - handle null, empty string, and case-insensitive partial matching
      const titleMatch: boolean =
        filtersClass.titleFilter == null ||
        filtersClass.titleFilter === '' ||
        product.title.toLowerCase().includes(filtersClass.titleFilter.toLowerCase());

      // Price filter - handle null and ensure product price is less than or equal to max price
      const priceMatch: boolean =
        filtersClass.maxPriceFilter == null ||
        product.price <= filtersClass.maxPriceFilter;

      return categoryMatch && titleMatch && priceMatch;
    });
  }
}
