import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-saber-mas',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './saber.mas.component.html',
  styleUrls: ['./saber.mas.component.css']
})
export class SaberMasComponent {
 

  testimonios = [
  { texto: '¡El mejor evento al que he asistido! Cada detalle fue impecable y memorable.', autor: 'Laura Gómez' },
  { texto: 'Ambiente increíble, organización impecable y diversión asegurada. ¡Volveré sin duda!', autor: 'Carlos Méndez' },
  { texto: 'Gracias por hacer realidad nuestro sueño. Fue una boda mágica e inolvidable.', autor: 'Ana y Luis' }
];

faqs = [
  { pregunta: '¿Qué servicios incluye la organización de eventos?', respuesta: 'Nos encargamos de la planificación, coordinación, ambientación, sonido, iluminación y mucho más.' },
  { pregunta: '¿Puedo contratar servicios de forma individual?', respuesta: 'Sí, ofrecemos paquetes personalizados y servicios a la carta según tus necesidades.' },
  { pregunta: '¿Cuáles son las formas de pago disponibles?', respuesta: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos programados.' }
];

faqCards = [
  { pregunta: '¿Realizan eventos a nivel nacional?', respuesta: 'Sí, cubrimos eventos en todo el país, desplazándonos donde lo necesites.' },
  { pregunta: '¿Con cuánto tiempo debo reservar?', respuesta: 'Recomendamos reservar con al menos 2-3 meses de anticipación para garantizar disponibilidad.' },
  { pregunta: '¿Organizan eventos privados y corporativos?', respuesta: 'Sí, trabajamos tanto con clientes particulares como con empresas y organizaciones.' }
];

}
