import { Component, OnInit } from '@angular/core';
import { ImageUtils } from '../../utils/ImageUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  protected topImagePath: string = "assets/images/top-image.jpg";
  protected isTopImageLoaded: boolean = false;

  protected imageWidth: number = 1000;
  protected imageHeight: number = 400;

  constructor (private _router: Router) {}

  async ngOnInit(): Promise<void> {

    try {
      const imageElement = await ImageUtils.getImage(this.topImagePath);
      this.imageWidth = ImageUtils.calculateWidthPreservingAspectRatio(imageElement, this.imageHeight);
      this.isTopImageLoaded = true;
    } catch(err) {
      console.log(err);
    }
  }

  redirectToProducts() {
    this._router.navigateByUrl('/user/products').then(_ => {});
  }
}
