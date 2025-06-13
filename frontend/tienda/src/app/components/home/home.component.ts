import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { Carousel2Component } from '../carousel2/carousel2.component';
import { Carousel3Component } from '../carousel3/carousel3.component';

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
    Carousel3Component
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventoService]
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
    });
  }
}
