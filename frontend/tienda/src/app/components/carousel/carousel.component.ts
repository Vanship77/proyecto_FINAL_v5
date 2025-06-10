// carousel.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  slides = [
    {
      img: 'https://i.pinimg.com/736x/14/ed/06/14ed06a74b2bb04d3dca0abd4d18535d.jpg',
      alt: 'Imagen 1',
      title: 'Creatividad Natural',
      text: 'Explora la fusión entre arte y naturaleza en un solo vistazo.'
    },
    {
      img: 'https://i.pinimg.com/736x/71/81/6f/71816f1aba6175adad29f461f0b2a57e.jpg',
      alt: 'Imagen 2',
      title: 'Inspiración Urbana',
      text: 'Estética urbana que conecta cultura, color y caos creativo.'
    },
    {
      img: 'https://i.pinimg.com/736x/12/6b/8b/126b8ba03c3985120c795b541b6c9adf.jpg',
      alt: 'Imagen 3',
      title: 'Mirada Interior',
      text: 'La introspección convertida en obra visual, con alma y mensaje.'
    }
  ];
}
