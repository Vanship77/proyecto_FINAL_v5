import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventoFormComponent {
  nuevoEvento = {
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    precio: 0
  };

  selectedFile: File | null = null;

  constructor(private eventoService: EventoService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  agregar() {
    if (!this.selectedFile) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.nuevoEvento.titulo);
    formData.append('descripcion', this.nuevoEvento.descripcion);
    formData.append('fecha', this.nuevoEvento.fecha);
    formData.append('lugar', this.nuevoEvento.lugar);
    formData.append('precio', this.nuevoEvento.precio.toString());
    formData.append('imagen', this.selectedFile);

    this.eventoService.addEvento(formData).subscribe({
      next: () => {
        alert('Evento agregado correctamente');
        this.nuevoEvento = {
          titulo: '',
          descripcion: '',
          fecha: '',
          lugar: '',
          precio: 0
        };
        this.selectedFile = null;
        // puedes limpiar el input de tipo file si lo deseas
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        console.error('Error al agregar evento:', err);
        alert('Hubo un error al agregar el evento');
      }
    });
  }
}
