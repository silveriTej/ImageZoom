import { Component, ComponentRef, Injector, ViewContainerRef, OnInit } from '@angular/core';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  imageUrls: string[] = [
    'assets/pexels-kasperphotography-1042423.jpeg',
    'assets/tree scenery.jpeg',
    'assets/pexels-thatguycraig000-1563356.jpeg'
  ];

  private imageZoomRef!: ComponentRef<ImageZoomComponent>;

  constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {}

  ngOnInit() {
    this.injectImageZoomComponent();
  }

  private injectImageZoomComponent() {
    // Dynamically create the ImageZoomComponent inside the current ViewContainerRef
    const componentFactory = this.viewContainerRef.createComponent<ImageZoomComponent>(ImageZoomComponent);

    // Store the created component reference
    this.imageZoomRef = componentFactory;

    // Pass the imageUrls array to the ImageZoomComponent instance
    this.imageZoomRef.instance.imageUrls = this.imageUrls;
  }

  // Method to open the image popup from the gallery
  openImagePopup(index: number) {
    this.imageZoomRef.instance.openImagePopup(index);
  }
}
