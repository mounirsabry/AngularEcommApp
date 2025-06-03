export class ImageUtils {

  static getImage(imagePath: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imagePath;

      img.onload = (): void => {
        resolve(img); // Resolve with the loaded image
      };

      img.onerror = (_): void => {
        reject(new Error(`Failed to load image at path: ${imagePath}`));
      };
    });
  }

  static calculateHeightPreservingAspectRatio(img: HTMLImageElement, desiredWidth: number): number {
    const aspectRatio = img.height / img.width;
    return Math.round(desiredWidth * aspectRatio);
  }

  static calculateWidthPreservingAspectRatio(img: HTMLImageElement, desiredHeight: number): number {
    const aspectRatio = img.width / img.height;
    return Math.round(desiredHeight * aspectRatio);
  }
}
