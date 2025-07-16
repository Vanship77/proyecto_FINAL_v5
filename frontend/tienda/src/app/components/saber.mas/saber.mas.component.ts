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
  currentTestimonial = 0;
  activeFaqIndex: number | null = null;

  testimonios = [
    { 
      texto: '¡El mejor evento al que he asistido! Cada detalle fue impecable y memorable.', 
      autor: 'Laura Gómez',
      cargo: 'Asistente a Gala' 
    },
    { 
      texto: 'Ambiente increíble, organización impecable y diversión asegurada. ¡Volveré sin duda!', 
      autor: 'Carlos Méndez',
      cargo: 'Cliente Corporativo' 
    },
    { 
      texto: 'Gracias por hacer realidad nuestro sueño. Fue una boda mágica e inolvidable.', 
      autor: 'Ana y Luis',
      cargo: 'Novios' 
    }
  ];

  faqs = [
    { 
      pregunta: '¿Qué servicios incluye la organización de eventos?', 
      respuesta: 'Nos encargamos de la planificación, coordinación, ambientación, sonido, iluminación y mucho más.',
      active: false 
    },
    { 
      pregunta: '¿Puedo contratar servicios de forma individual?', 
      respuesta: 'Sí, ofrecemos paquetes personalizados y servicios a la carta según tus necesidades.',
      active: false 
    },
    { 
      pregunta: '¿Cuáles son las formas de pago disponibles?', 
      respuesta: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos programados.',
      active: false 
    }
  ];

  faqCards = [
    { 
      pregunta: '¿Realizan eventos a nivel nacional?', 
      respuesta: 'Sí, cubrimos eventos en todo el país, desplazándonos donde lo necesites.',
      active: true 
    },
    { 
      pregunta: '¿Con cuánto tiempo debo reservar?', 
      respuesta: 'Recomendamos reservar con al menos 2-3 meses de anticipación para garantizar disponibilidad.',
      active: false 
    },
    { 
      pregunta: '¿Organizan eventos privados y corporativos?', 
      respuesta: 'Sí, trabajamos tanto con clientes particulares como con empresas y organizaciones.',
      active: false 
    }
  ];

  // Método para alternar FAQ
  toggleFaq(index: number, section: 'faqs' | 'faqCards'): void {
    if (this.activeFaqIndex === index && this[section][index].active) {
      this[section][index].active = false;
      this.activeFaqIndex = null;
    } else {
      // Cerrar cualquier FAQ abierto previamente
      if (this.activeFaqIndex !== null) {
        this[section][this.activeFaqIndex].active = false;
      }
      this[section][index].active = true;
      this.activeFaqIndex = index;
    }
  }

  // Navegación de testimonios
  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonios.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonios.length) % this.testimonios.length;
  }

  // Seleccionar testimonio específico
  goToTestimonial(index: number): void {
    this.currentTestimonial = index;
  }
}