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
    { texto: '¡El mejor evento al que he asistido! Todo fue perfecto.', autor: 'Laura Gómez' },
    { texto: 'Ambiente, organización y diversión al 100%. Repetiré sin duda.', autor: 'Carlos Méndez' },
    { texto: 'Gracias por cumplir nuestro sueño. Fue una boda mágica.', autor: 'Ana y Luis' }
  ];

  faqs = [
    { pregunta: '¿Qué incluye el servicio de organización?', respuesta: 'Incluye planificación, coordinación, ambientación, sonido, luces y más.' },
    { pregunta: '¿Puedo contratar solo un servicio específico?', respuesta: 'Sí, ofrecemos paquetes flexibles y servicios individuales.' },
    { pregunta: '¿Qué formas de pago aceptan?', respuesta: 'Aceptamos transferencias, tarjetas y pagos programados.' }
  ];

  faqCards = [
    { pregunta: '¿Organizan eventos en todo el país?', respuesta: 'Sí, nos trasladamos a donde necesites dentro del territorio nacional.' },
    { pregunta: '¿Con cuánta anticipación debo reservar?', respuesta: 'Lo ideal es con 2-3 meses de anticipación para asegurar disponibilidad.' },
    { pregunta: '¿Tienen eventos privados y corporativos?', respuesta: 'Sí, trabajamos tanto con particulares como con empresas.' }
  ];
}
