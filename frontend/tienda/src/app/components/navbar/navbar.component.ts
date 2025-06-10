import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sidebarOpen = false;
  sidebar2Open = false;
  isLoggedIn = false;
  userData: any = null;

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSidebar2() {
    this.sidebar2Open = !this.sidebar2Open;
  }

  loginWithGoogle() {
    window.open('http://localhost:8080/api/login/google', '_self');
  }

  loginWithGithub() {
    window.open('http://localhost:8080/api/login/github', '_self');
  }

  logout() {
    window.open('http://localhost:8080/api/logout', '_self');
    this.isLoggedIn = false;
    this.userData = null;
    this.sidebar2Open = false;  // cerrar sidebar perfil
    console.log('🚪 Sesión cerrada');
  }

  checkSession() {
    this.http.get('http://localhost:8080/api/sesion', { withCredentials: true }).subscribe({
      next: (res: any) => {
        if (res && res.nombre) {
          this.isLoggedIn = true;
          this.userData = res;
          this.sidebarOpen = true;   // abrir sidebar principal
          this.sidebar2Open = true;  // abrir sidebar perfil
          console.log('🧠 Usuario autenticado:', res);
        } else {
          this.isLoggedIn = false;
          this.userData = null;
          this.sidebarOpen = false;
          this.sidebar2Open = false;
          console.log('👻 No hay sesión activa');
        }
      },
      error: err => {
        console.warn('💥 Error al verificar sesión:', err);
        this.isLoggedIn = false;
        this.userData = null;
        this.sidebarOpen = false;
        this.sidebar2Open = false;
      }
    });
  }

  // Para el botón "Simulación"
  startSimulation() {
    console.log('▶️ Simulación: verificando sesión...');
    this.checkSession();
  }
}
