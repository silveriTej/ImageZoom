import { Component, Input, HostListener, ViewContainerRef, Injector, ComponentFactoryResolver, ComponentRef, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css'],
  standalone: true,
  imports: [CommonModule]
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
  private imageZoomRef!: ComponentRef<ImageZoomComponent>; // Declare imageZoomRef

  // Inject ViewContainerRef, Injector, ComponentFactoryResolver, and ApplicationRef for dynamic operations
  constructor(
    private viewContainerRef: ViewContainerRef, 
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef // Add ApplicationRef for managing the component view
  ) {}

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

  openComponent(images: string[], currentIndex: number) {
    this.imageUrls = images;  // Update the imageUrls array
    this.injectImageZoomComponent();  // Call the injectImageZoomComponent method
    this.imageZoomRef.instance.openImagePopup(currentIndex);  // Open the image popup with the current index
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

  // Handle mouse wheel events for zooming and updating the transform origin
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
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the image
    const y = event.clientY - rect.top;  // y position within the image
    this.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
  }

  clearError() {
    this.errorMessage = null; 
  }

  // Example method to use ViewContainerRef for dynamic component creation
  private injectImageZoomComponent() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ImageZoomComponent);

    // Dynamically create the component inside the current ViewContainerRef
    const componentRef: ComponentRef<ImageZoomComponent> = this.viewContainerRef.createComponent(factory, 0, this.injector);
    
    // Attach the component to the ApplicationRef so it becomes part of the app view
    this.appRef.attachView(componentRef.hostView);

    // Optionally pass data to the new component instance
    componentRef.instance.imageUrls = this.imageUrls;
    this.imageZoomRef = componentRef; // Store reference for further operations
  }
}
