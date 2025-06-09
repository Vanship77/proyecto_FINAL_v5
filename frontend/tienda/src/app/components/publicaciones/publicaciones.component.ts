import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
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
}
