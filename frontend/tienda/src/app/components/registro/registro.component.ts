import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent]
})
export class RegistroComponent {
  registro: FormGroup;
  previewImg: string | null = null;
  imagenFile: File | null = null;
  imagenError: string = '';

  constructor(private fb: FormBuilder, private userService: RegistroService) {
    this.registro = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      lastName: ['', [Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      provider: ['local'],
      role: ['user'],
      photoUrl: ['']
    }, { validators: this.matchPasswords });
  }

  matchPasswords(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onFileSelected(event: any) {
    this.imagenError = '';
    const file: File = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        this.imagenError = 'Solo se permiten imágenes JPG o PNG 🚫';
        this.imagenFile = null;
        this.previewImg = null;
        return;
      }
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImg = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  enviar() {
    if (this.registro.valid) {
      const formData = new FormData();
      Object.entries(this.registro.value).forEach(([key, value]) => {
        if (key !== 'photoUrl' && value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (this.imagenFile) {
        formData.append('photo', this.imagenFile);
      }

      this.userService.registrarUsuario(formData).subscribe(
        res => alert('Registrado exitosamente 🎉'),
        err => {
          if (err.error?.code === 11000) {
            alert('El email ya está registrado 😓');
          } else {
            alert('Error al registrar 😓');
          }
        }
      );
    } else {
      alert('Hay errores en el formulario ⚠️');
    }
  }
}