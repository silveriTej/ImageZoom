import { Component, ViewContainerRef, ComponentFactoryResolver, Injector, ComponentRef } from '@angular/core';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Make the component standalone
  imports: [CommonModule, ImageZoomComponent] // Import CommonModule and ImageZoomComponent
})
export class AppComponent {
  imageUrls: string[] = [
    'assets/pexels-kasperphotography-1042423.jpeg',
    'assets/tree scenery.jpeg',
    'assets/pexels-thatguycraig000-1563356.jpeg'
  ];

  private imageZoomRef!: ComponentRef<ImageZoomComponent>;

  // Injecting ViewContainerRef and ComponentFactoryResolver in the constructor
  constructor(
    private viewContainerRef: ViewContainerRef, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.injectImageZoomComponent();  // Call to dynamically create the component in the constructor
  }

  // Function to dynamically inject the ImageZoomComponent
  private injectImageZoomComponent() {
    // Resolve the component factory for ImageZoomComponent
    const factory = this.componentFactoryResolver.resolveComponentFactory(ImageZoomComponent);

    // Dynamically create the component
    this.imageZoomRef = this.viewContainerRef.createComponent(factory, 0, this.injector);

    // Pass the imageUrls array to the ImageZoomComponent
    this.imageZoomRef.instance.imageUrls = this.imageUrls;
  }
  
  // Method to open the image popup from the gallery
  openImagePopup(index: number) {
    this.imageZoomRef.instance.openImagePopup(index);
  }
}
