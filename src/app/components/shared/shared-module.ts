import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  exports: [
    LayoutComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent
  ]
})
export class SharedModule { }
