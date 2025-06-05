import { Injectable } from '@angular/core';
import { FiltersClass } from '../types/FiltersClass';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  private specifiedFilters: FiltersClass = new FiltersClass();

  constructor() {}

  setFilters(specifiedFilters: FiltersClass): void {
    this.specifiedFilters = specifiedFilters;
  }

  getFilters(): FiltersClass {
    return this.specifiedFilters;
  }
}
