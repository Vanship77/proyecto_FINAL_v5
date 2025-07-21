import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  Math = Math;
  eventos: Evento[] = [];

  // Solo un ID visible o null
  detallesVisibles: string | null = null;

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.eventoService.getEventos().subscribe(data => {
      this.eventos = data;
    });
  }
activarDarkMode() {
  document.body.classList.toggle('dark-mode');
}

  toggleDetalles(id?: string) {
    if (!id) return;
    // Si ya está abierto, cierra; si no, abre el nuevo
    this.detallesVisibles = this.detallesVisibles === id ? null : id;
  }

  meInteresa(evento: Evento) {
    alert(`¡Te interesa el evento: ${evento.titulo}!`);
  }

  getClaseCarta(index: number, eventoId: string): string {
    // Cambia la clase para quitar hover cuando detalles están abiertos
    const mod = index % 3;
    const baseClass = (mod === 0 || mod === 1) ? 'carta doble' : 'carta grande';
    // Si la carta está abierta, le quitamos clase hover
    return this.detallesVisibles === eventoId ? baseClass + ' no-hover' : baseClass;
  }

async pagar(evento: Evento) {
  const stripe = await loadStripe('pk_test_51RktNtKxn7zo51ac7i8IAFs6wORIEjHqBpYERPxhsmfphFSmcSJRMEK1tJwVBsU5NRAQNYHxddh53TcLMG6qhEPW00SWXd3C6D');

  const response = await fetch('http://localhost:8080/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evento }),
  });

  const session = await response.json();

  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  });

  if (result?.error) {
    console.error(result.error.message);
  }
}
}
