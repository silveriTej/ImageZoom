import { Component } from '@angular/core';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ImageZoomComponent]
})
export class AppComponent {
  isPopupOpen: boolean = false;
  currentIndex: number = 0;
  errorMessage: string = '';

  openImagePopup(index: number) {
    try {
      if (index >= 0 && index < 3) { 
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
