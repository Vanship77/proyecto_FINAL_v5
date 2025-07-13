import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

// Definir interfaz para un evento comprado
interface Ticket {
  id: number;
  nombre: string;
  fecha: Date;
  lugar: string;
  imagen: string;
}

// Interfaz para el usuario
interface Usuario {
  nombre: string;
  email: string;
  telefono?: string;
  ubicacion?: string;
  fechaRegistro: Date;
  ticketsComprados: Ticket[];
  eventosAsistidos: number;
  eventosFavoritos: string[];
  favoritos: string[];
  notificaciones: string[];
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    RouterModule
  ],
})
export class PerfilComponent {
  usuario: Usuario = {
    nombre: 'Vanship77',
    email: 'vanship@example.com',
    telefono: '+593 987 654 321',
    ubicacion: 'Quito, Ecuador',
    fechaRegistro: new Date(2023, 0, 15),
    ticketsComprados: [
      {
  id: 1,
  nombre: 'Concierto Rock Quito',
  fecha: new Date(2025, 8, 10),
  lugar: 'Auditorio Nacional',
  imagen: 'https://i.pinimg.com/736x/b6/4f/4f/b64f4f78f97d13a17eb8335887443a9d.jpg' // imagen de concierto de rock
},
{
  id: 2,
  nombre: 'Festival Indie',
  fecha: new Date(2025, 10, 5),
  lugar: 'Parque Central',
  imagen: 'https://i.pinimg.com/736x/c6/cd/85/c6cd8559f937faad15125ca660d74d9a.jpg' // imagen de festival estilo indie
}

    ],
    eventosAsistidos: 12,
    eventosFavoritos: ['Rock', 'Jazz', 'Electrónica'],
    favoritos: ['Coldplay', 'Arctic Monkeys', 'Tame Impala'],
    notificaciones: [
      'Tu entrada para Rock Quito está confirmada',
      'Nuevo evento agregado: Festival Jazz 2025',
      'Tu perfil fue actualizado exitosamente'
    ]
  };

  editarPerfil() {
    alert('Aquí iría la lógica para editar perfil');
  }

  cerrarSesion() {
    alert('Cerrar sesión');
  }

  verDetalle(eventoId: number) {
    alert(`Ver detalle del evento con id ${eventoId}`);
  }
}
