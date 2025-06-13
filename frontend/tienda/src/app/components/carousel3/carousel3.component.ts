import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-carousel3',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel3.component.html',
  styleUrls: ['./carousel3.component.css']
})
export class Carousel3Component implements AfterViewInit, OnDestroy {
  eventos: Evento[] = [];
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef<HTMLDivElement>;
  private scrollPos = 0;
  private intervalId: any;

  constructor(private eventoService: EventoService) {}

  ngAfterViewInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
      setTimeout(() => {
        this.cloneCards();
        this.startAutoScroll();
      }, 0);
    });
  }

  private cloneCards() {
    const wrapper = this.carouselWrapper?.nativeElement;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.card');
    if (cards.length > 0) {
      cards.forEach(card => {
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

    const gap = 16;
    const cardWidth = card.offsetWidth + gap;

    this.scrollPos += direction * cardWidth;

    const maxScroll = wrapper.scrollWidth / 2;
    if (this.scrollPos < 0) this.scrollPos = maxScroll;
    if (this.scrollPos > maxScroll) this.scrollPos = 0;

    wrapper.scrollTo({ left: this.scrollPos, behavior: 'smooth' });
  }

  private startAutoScroll() {
    this.intervalId = setInterval(() => this.scroll(1), 3000); // cada 3 seg
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
