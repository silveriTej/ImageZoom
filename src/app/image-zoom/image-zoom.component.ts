import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ImageZoomComponent {
  @Input() imageUrls!: string[]; 
  @Input() currentIndex: number = 0;
  @Input() isPopupOpen: boolean = false;
  @Output() closePopup: EventEmitter<void> = new EventEmitter();

  @ViewChild('zoomedImage') zoomedImage!: ElementRef;
  scale: number = 1;
  maxScale: number = 10;
  minScale: number = 1;
  transformOrigin: string = 'center center';

  errorMessage: string | null = null; 

  closeImagePopup() {
    try {
      this.closePopup.emit();
      this.scale = this.minScale;
    } catch (error) {
      this.handleError('Error closing popup');
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
