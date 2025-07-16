import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
      this.updateAdminStatus();

      if (!status) {
        this.closeAllSidebars();
        this.resetUserData();
      }
    });

    this.userSub = this.auth.userData$.subscribe(userData => {
      this.userName = userData?.name || null;
      this.authProvider = userData?.provider || null;
      this.role = userData?.role || null;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    
    // Si el clic no fue en un botón de toggle ni dentro de un sidebar
    if (!target.closest('.navbar-toggle') && 
        !target.closest('.sidebar') &&
        !target.closest('.sidebar-overlay') &&
        (this.sidebarOpen || this.sidebar2Open)) {
      this.closeAllSidebars();
    }
  }

  closeAllSidebars(): void {
    this.sidebarOpen = false;
    this.sidebar2Open = false;
    document.body.classList.remove('sidebar-open');
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.sidebarOpen) {
      this.sidebar2Open = false;
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }

  toggleSidebar2(): void {
    this.sidebar2Open = !this.sidebar2Open;
    if (this.sidebar2Open) {
      this.sidebarOpen = false;
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
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

  goToAdminPanel(): void {
    if (this.isUserAdmin()) {
      this.router.navigate(['/admin']);
      this.closeAllSidebars();
    }
  }

  isUserAdmin(): boolean {
    return this.isLoggedIn && this.role === 'admin';
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}