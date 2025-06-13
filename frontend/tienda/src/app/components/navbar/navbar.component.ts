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
  
  private authSub!: Subscription;
  private userSub!: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.setupAuthSubscriptions();
    this.auth.checkSession();
    
  }

  private setupAuthSubscriptions(): void {
    this.authSub = this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (!status) {
        this.closeAllSidebars();
      }
    });
    
    this.userSub = this.auth.userData$.subscribe(userData => {
      this.userName = userData?.name || null;
      this.authProvider = userData?.provider || null;
    });
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
    this.closeAllSidebars();
    this.router.navigate(['/']);
  }

  getProviderIcon(): string {
    switch(this.authProvider) {
      case 'google': return 'bi bi-google';
      case 'github': return 'bi bi-github';
      default: return 'bi bi-person';
    }
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}