import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { Carousel2Component } from '../carousel2/carousel2.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    Carousel2Component,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventoService]
})
export class HomeComponent implements OnInit, AfterViewInit {
  eventos: Evento[] = [];
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef<HTMLDivElement>;

  private scrollPos = 0;

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
    });
  }

  ngAfterViewInit() {
    // Esperar un tick para que los elementos se rendericen
    setTimeout(() => {
      this.cloneCards();
    }, 0);
  }

  private cloneCards() {
    const wrapper = this.carouselWrapper?.nativeElement;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.card');
    
    // Verificar que existan cards antes de hacer forEach
    if (cards && cards.length > 0) {
      // Convertir NodeList a Array y hacer forEach
      Array.from(cards).forEach(card => {
        const clone = card.cloneNode(true);
        wrapper.appendChild(clone);
      });
    }
  }

  scroll(direction: number) {
    const wrapper = this.carouselWrapper?.nativeElement;
    if (!wrapper) return;

    const card = wrapper.querySelector('.card') as HTMLElement | null;
    if (!card) return;

    const style = getComputedStyle(card);
    const gap = parseInt(style.marginRight) || 16;
    const cardWidth = card.offsetWidth + gap;

    this.scrollPos += direction * cardWidth;

    // Loop visual
    if (this.scrollPos < 0) {
      this.scrollPos = wrapper.scrollWidth / 2;
    }
    if (this.scrollPos > wrapper.scrollWidth / 2) {
      this.scrollPos = 0;
    }

    wrapper.scrollTo({ left: this.scrollPos, behavior: 'smooth' });
  }
}