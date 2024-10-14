import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]  
})
export class AppComponent {
  isPopupOpen: boolean = false;
  currentIndex: number = 0;
  scale: number = 1;
  maxScale: number = 10;
  minScale: number = 1;
  transformOrigin: string = 'center center';
  errorMessage: string | null = null;

  @ViewChild('zoomedImage') zoomedImage!: ElementRef;

  imageUrls: string[] = [
    'assets/pexels-kasperphotography-1042423.jpeg',
    'assets/tree scenery.jpeg',
    'assets/pexels-thatguycraig000-1563356.jpeg'
  ];

  openImagePopup(index: number) {
    try {
      if (index >= 0 && index < this.imageUrls.length) {
        this.currentIndex = index;
        this.isPopupOpen = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Invalid image index.';
      }
    } catch (error) {
      this.errorMessage = 'An error occurred while opening the image popup.';
      console.error('Error opening image popup:', error);
    }
  }

  closeImagePopup() {
    try {
      this.isPopupOpen = false;
      this.scale = this.minScale;
    } catch (error) {
      this.handleError('Error closing image popup');
    }
  }

  onImageClick() {
    try {
      if (this.scale < this.maxScale) {
        this.scale += 1;
      } else if (this.scale > this.minScale) {
        this.scale -= 1;
      }
    } catch (error) {
      this.handleError('Error while zooming image');
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    try {
      if (this.isPopupOpen) {
        event.preventDefault();

        const imageElement = this.zoomedImage.nativeElement;
        const rect = imageElement.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        this.transformOrigin = `${(offsetX / rect.width) * 100}% ${(offsetY / rect.height) * 100}%`;

        if (event.deltaY < 0 && this.scale < this.maxScale) {
          this.scale += 0.1;
        } else if (event.deltaY > 0 && this.scale > this.minScale) {
          this.scale -= 0.1;
        }
      }
    } catch (error) {
      this.handleError('Error during zoom with scroll wheel');
    }
  }

  nextImage() {
    try {
      if (this.currentIndex < this.imageUrls.length - 1) {
        this.currentIndex++;
      } else {
        console.warn('Reached the last image');
      }
    } catch (error) {
      this.handleError('Error navigating to the next image');
    }
  }

  previousImage() {
    try {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        console.warn('Already at the first image');
      }
    } catch (error) {
      this.handleError('Error navigating to the previous image');
    }
  }

  handleError(message: string) {
    console.error(message);
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }
}
