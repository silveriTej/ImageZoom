import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css'],
  standalone: true,
  imports: [CommonModule] // Add CommonModule to the imports
})
export class ImageZoomComponent {
  @Input() imageUrls!: string[]; // Accepts an array of image URLs
  currentIndex: number = 0;
  isPopupOpen: boolean = false; 
  scale: number = 1;
  maxScale: number = 10;
  minScale: number = 1;
  errorMessage: string | null = null; 
  transformOrigin: string = '50% 50%'; // Default transform origin to center
  private lastMousePosition = { x: 0, y: 0 }; // To track last mouse position

  // Opens the image popup with the image at the given index
  openImagePopup(index: number) {
    if (index >= 0 && index < this.imageUrls.length) {
      this.currentIndex = index;
      this.isPopupOpen = true;
      this.errorMessage = '';  
    } else {
      this.errorMessage = 'Invalid image index.';
    }
  }

  closeImagePopup() {
    this.isPopupOpen = false; 
    this.scale = this.minScale; 
  }

  zoomIn() {
    if (this.scale < this.maxScale) {
      this.scale += 0.5;
    }
  }

  zoomOut() {
    if (this.scale > this.minScale) {
      this.scale -= 0.5;
    }
  }

  nextImage() {
    if (this.currentIndex < this.imageUrls.length - 1) {
      this.currentIndex++;
    }
  }

  previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    event.preventDefault(); // Prevent the default scroll behavior

    // Set the last mouse position based on the current mouse position
    this.lastMousePosition = {
      x: event.clientX,
      y: event.clientY
    };

    // Calculate the image's bounding rectangle
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();

    // Calculate the relative mouse position within the image
    const x = this.lastMousePosition.x - rect.left; 
    const y = this.lastMousePosition.y - rect.top;

    // Update transform-origin based on cursor position
    this.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;

    // Zoom based on scroll direction
    if (event.deltaY < 0) {
      this.zoomIn(); // Scroll up - zoom in
    } else {
      this.zoomOut(); // Scroll down - zoom out
    }
  }

  onImageClick(event: MouseEvent) {
    // Calculate cursor position relative to the image
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the image
    const y = event.clientY - rect.top;  // y position within the image

    // Set transform-origin based on cursor position
    this.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
  }

  clearError() {
    this.errorMessage = null; 
  }
}
