import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import emailjs  from '@emailjs/browser'; // <--- Importa EmailJS

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ]
})
export class ContactComponent {
  contact: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contact = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contact.valid) {
      const templateParams = {
        title: 'Nuevo mensaje desde el formulario',
        name: this.contact.value.usuario,
        email: this.contact.value.email,
        message: this.contact.value.mensaje,
        time: new Date().toLocaleString()
      };

      emailjs.send(
        'service_m444tn8',    // <-- reemplaza con tu Service ID
        'template_mi1e12o',   // <-- reemplaza con tu Template ID
        templateParams,
        'xstcBC22e-Z2Hd3eN'     // <-- reemplaza con tu Public Key
      ).then(() => {
        this.submitted = true;
        this.contact.reset();
      }, (error) => {
        alert('Hubo un problema al enviar el mensaje. Intenta más tarde.');
        console.error(error);
      });

    } else {
      alert('Por favor completar todos los campos correctamente 🛑');
    }
  }
}
