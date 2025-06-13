import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import emailjs  from '@emailjs/browser'; // <--- Importa EmailJS
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    HttpClientModule
  ]
})
export class ContactComponent {
  contact: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contact = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)]],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contact.valid) {
      const templateParams = {
        title: 'Mensaje enviado',
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

       this.http.post('http://localhost:8080/api/mensajes', 
 {
        usuario: this.contact.value.usuario,
        email: this.contact.value.email,
        mensaje: this.contact.value.mensaje,
        fecha: new Date()
      }).subscribe({
        next: (res: any) => {
          console.log('Mensaje guardado en base de datos:', res);
        },
        error: (err) => {
          console.error('Error al guardar en la base de datos:', err);
        }
      });

    } else {
      alert('Por favor completar todos los campos correctamente 🛑');
    }
  }
}
