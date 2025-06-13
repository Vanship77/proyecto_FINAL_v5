import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component';
@Component({
  selector: 'app-publicaciones2',
  imports: [NavbarComponent,FooterComponent, PublicacionesComponent],
  templateUrl: './publicaciones2.component.html',
  styleUrl: './publicaciones2.component.css'
})
export class Publicaciones2Component {
  contactar() {
    console.log('Botón CONTACTAR clickeado');
    // Lógica para contactar
  }

  sugerirEvento() {
    console.log('Botón Sugerir Evento clickeado');
    // Lógica para sugerir eventos
  }
}