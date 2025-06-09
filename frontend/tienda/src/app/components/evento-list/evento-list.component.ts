import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {
  eventos: Evento[] = [];
  eventoSeleccionado?: Evento; 
  modoEdicion = false;

  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventoService.getEventos().subscribe(data => this.eventos = data);
  }

  eliminar(id: string) {
    if (confirm('¿Seguro quieres eliminar este evento?')) {
      this.eventoService.deleteEvento(id).subscribe(() => {
        this.eventos = this.eventos.filter(e => e._id !== id);
        if (this.eventoSeleccionado?._id === id) this.cancelar();
      });
    }
  }

  ver(evento: Evento) {
    this.eventoSeleccionado = { ...evento };
    this.modoEdicion = false;
  }

  editar(evento: Evento) {
    this.eventoSeleccionado = { ...evento };
    this.modoEdicion = true;
  }

  nuevo() {
    this.eventoSeleccionado = {
      titulo: '',
      descripcion: '',
      fecha: '',
      lugar: '',
      precio: 0,
      imagen: ''
    };
    this.modoEdicion = true;
  }

  guardar(evento: Evento) {
    if (evento._id) {
      this.eventoService.updateEvento(evento._id, evento).subscribe(() => {
        this.cargarEventos();
        this.cancelar();
      });
    } else {
      this.eventoService.addEvento(evento).subscribe(() => {
        this.cargarEventos();
        this.cancelar();
      });
    }
  }

  cancelar() {
    this.eventoSeleccionado = undefined;
    this.modoEdicion = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo archivos PNG o JPG, porfa.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (this.eventoSeleccionado) {
        this.eventoSeleccionado.imagen = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}
