import { ImageUtils } from './ImageUtils';
import { Product } from '../models/Product';
import { ProductWithDimensions } from '../types/ProductWithDimensions';

export class ProductUtils {
  static async getProductWithDimensions(product: Product, desiredWidth: number): Promise<ProductWithDimensions> {
    const imagePath: string | null = product.images[0]!;

    if (imagePath == null) {
      return {
        ...product,
        calculatedHeight: 0
      };
    }

    try {
      const imageElement = await ImageUtils.getImage(imagePath);
      const height: number = ImageUtils.calculateHeightPreservingAspectRatio(imageElement, desiredWidth);

      return {
        ...product,
        calculatedHeight: height
      };
    } catch (error) {
      console.error(`Failed to load image for product ${product.title}:`, error);
      return {
        ...product,
        calculatedHeight: 0
      };
    }
  }
}
