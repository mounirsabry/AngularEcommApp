import { FilterProductsPipe } from './filter-products-pipe';
import { inject } from '@angular/core';
import { ProductFilterService } from '../services/product-filter.service';

describe('FilterProductsPipe', () => {
  it('create an instance', () => {

    const productFilterService: ProductFilterService = inject(ProductFilterService);
    const pipe = new FilterProductsPipe(productFilterService);
    expect(pipe).toBeTruthy();
  });
});
