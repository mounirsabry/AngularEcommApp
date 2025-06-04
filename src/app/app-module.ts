import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { RatingPipe } from './pipes/rating-pipe';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    ProductsFilterComponent,
    ProductsComponent,
    RatingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
