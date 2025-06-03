import {Component, OnInit} from '@angular/core';
import {ImageUtils} from '../../utils/ImageUtils';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  protected topImagePath: string = "assets/images/top-image.jpg";
  protected isTopImageLoaded: boolean = false;

  protected imageWidth: number = 1000;
  protected imageHeight: number = 400;

  async ngOnInit(): Promise<void> {

    try {
      const imageElement = await ImageUtils.getImage(this.topImagePath);
      this.imageWidth = ImageUtils.calculateWidthPreservingAspectRatio(imageElement, this.imageHeight);
      this.isTopImageLoaded = true;
    } catch(err) {
      console.log(err);
    }
  }
}
