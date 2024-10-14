import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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

  // Error handling
  handleError(message: string) {
    console.error(message);
    this.errorMessage = message; 
  }

  clearError() {
    this.errorMessage = null; 
  }
}
