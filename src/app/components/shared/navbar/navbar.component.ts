import { Component } from '@angular/core';

@Component({
  selector: 'layout-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected title = 'ProductApp';
}
