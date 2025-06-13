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
      img: '/banner1.jpg',
      alt: 'Imagen 1',
      title: 'Creatividad Natural',
      text: 'Explora la fusión entre arte y naturaleza en un solo vistazo.'
    },
    {
      img: 'banner2.jpg',
      alt: 'Imagen 2',
      title: 'Inspiración Urbana',
      text: 'Estética urbana que conecta cultura, color y caos creativo.'
    },
    {
      img: 'banner3.jpg',
      alt: 'Imagen 3',
      title: 'Mirada Interior',
      text: 'La introspección convertida en obra visual, con alma y mensaje.'
    }
  ];
}
