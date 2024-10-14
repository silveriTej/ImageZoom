import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ImageZoomComponent } from './image-zoom/image-zoom.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, ImageZoomComponent]
})
export class AppComponent {
  isPopupOpen: boolean = false;
  currentIndex: number = 0;
  errorMessage: string = '';
  

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
        console.error('Error: Invalid image index');
      }
    } catch (error) {
      this.errorMessage = 'An error occurred while opening the image popup.';
      console.error('Error opening image popup:', error);
    }
  }

  closeImagePopup() {
    try {
      this.isPopupOpen = false;
    } catch (error) {
      this.errorMessage = 'An error occurred while closing the image popup.';
      console.error('Error closing image popup:', error);
    }
  }
}
