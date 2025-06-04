import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
  standalone: false
})
export class RatingPipe implements PipeTransform {

  transform(value: number): string {
    const fullStar = '⭐';
    const emptyStar = '☆';

    // Round to nearest half-star (e.g., 3.7 → 4.0, 3.2 → 3.0, 3.6 → 4.0)
    const rounded = Math.round(value * 2) / 2;

    let stars = '';

    for (let i = 1; i <= 5; i++) {
      if (i - 0.5 === rounded) {
        // Half-star logic removed – we'll skip it for now
        stars += fullStar; // You can change this to a custom symbol later if needed
      } else if (i <= rounded) {
        stars += fullStar;
      } else {
        stars += emptyStar;
      }
    }

    return stars;
  }

}
