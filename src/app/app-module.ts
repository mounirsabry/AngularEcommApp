import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { SharedModule } from './components/shared/shared-module';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()  // Now HttpClient is available globally.
  ],
  bootstrap: [App]
})
export class AppModule { }
