import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [NgIf, RouterLinkActive, RouterLink],
  standalone: true
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Control de sidebars
  sidebarOpen = false;
  sidebar2Open = false;

  // Estado de autenticación
  isLoggedIn = false;
  userName: string | null = null;
  authProvider: string | null = null;
  role: string | null = null;
  isAdmin = false;

  private authSub!: Subscription;
  private userSub!: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.setupAuthSubscriptions();
    this.auth.checkSession();
  }

  private setupAuthSubscriptions(): void {
    this.authSub = this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

      // Validar si el usuario es admin cuando cambia el estado
      this.updateAdminStatus();

      if (!status) {
        this.closeAllSidebars();
        this.resetUserData();
      }
    });

    this.userSub = this.auth.userData$.subscribe(userData => {
      this.userName = userData?.name || null;
      this.authProvider = userData?.provider || null;
      this.role = userData?.role || null; // ← Aquí obtienes el role

      // Actualizar estado admin cuando cambian los datos del usuario
      this.updateAdminStatus();
    });
  }

  private updateAdminStatus(): void {
    this.isAdmin = this.isLoggedIn && this.role === 'admin';
  }

  private resetUserData(): void {
    this.userName = null;
    this.authProvider = null;
    this.role = null;
    this.isAdmin = false;
  }

  // Método helper para verificar permisos de admin
  isUserAdmin(): boolean {
    return this.isLoggedIn && this.role === 'admin';
  }

  // Método para acciones que requieren permisos de admin
  executeAdminAction(action: () => void): void {
    if (this.isUserAdmin()) {
      action();
    } else {
      console.warn('Acceso denegado: Se requieren permisos de administrador');
      // Opcional: mostrar mensaje de error
    }
  }

  closeAllSidebars(): void {
    this.sidebarOpen = false;
    this.sidebar2Open = false;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.sidebar2Open = false;
    }
  }

  toggleSidebar2(): void {
    this.sidebar2Open = !this.sidebar2Open;
    if (this.sidebar2Open) {
      this.sidebarOpen = false;
    }
  }

  loginWithGoogle(): void {
    localStorage.setItem('redirectUrl', this.router.url);
    window.location.href = 'http://localhost:8080/login/google';
  }

  loginWithGithub(): void {
    localStorage.setItem('redirectUrl', this.router.url);
    window.location.href = 'http://localhost:8080/login/github';
  }

  logout(): void {

    this.auth.logout(); 
  }

  getProviderIcon(): string {
    switch (this.authProvider) {
      case 'google': return 'bi bi-google';
      case 'github': return 'bi bi-github';
      default: return 'bi bi-person';
    }
  }

  // Método para navegar al panel de admin (solo para admins)
  goToAdminPanel(): void {
    this.executeAdminAction(() => {
      this.router.navigate(['/admin']);
      this.closeAllSidebars();
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}