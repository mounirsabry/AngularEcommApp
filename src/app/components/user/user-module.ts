import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserRoutingModule } from './user-routing-module';
import { HomeComponent } from './components/home/home.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RatingPipe } from './pipes/rating-pipe';
import { FilterProductsPipe } from './pipes/filter-products-pipe';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsFilterComponent,
    ProductsComponent,
    ProductDetailsComponent,
    RatingPipe,
    FilterProductsPipe,
    CartComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    UserRoutingModule
  ],
  providers: []
})
export class UserModule { }
