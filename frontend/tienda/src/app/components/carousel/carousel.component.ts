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
  alt: 'Fotografía de naturaleza creativa',
  title: 'Arte Orgánico',
  text: 'Sumérgete en la armonía entre la naturaleza y la expresión artística, donde cada forma respira creatividad.'
},
{
  img: 'banner2.jpg',
  alt: 'Escena urbana vibrante',
  title: 'Estética Urbana',
  text: 'Explora el ritmo visual de la ciudad: color, caos y cultura fusionados en un paisaje vibrante.'
},
{
  img: 'banner3.jpg',
  alt: 'Retrato introspectivo',
  title: 'Reflejo del Alma',
  text: 'Una mirada hacia adentro hecha imagen, donde el arte se convierte en voz de la emoción y el pensamiento.'
}

  ];
}
