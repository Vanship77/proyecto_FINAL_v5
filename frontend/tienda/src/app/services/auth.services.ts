import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkSession();
  }

  checkSession() {
    // Solo ejecutar en el navegador, no en el servidor
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('token') || '';
    
    this.http.get<{ loggedIn: boolean, user?: any }>('http://localhost:8080/api/sesion/api/sesion', {
      withCredentials: true, // para sesión OAuth
      headers: {
        Authorization: `Bearer ${token}` // para JWT
      }
    }).subscribe({
      next: res => this.loggedIn.next(res.loggedIn),
      error: () => this.loggedIn.next(false)
    });
  }

  logout() {
    this.http.get('http://localhost:8080/logout', { withCredentials: true })
      .subscribe({
        next: () => {
          this.loggedIn.next(false);
          // Limpiar localStorage solo en el navegador
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
          }
        },
        error: () => this.loggedIn.next(false)
      });
  }

  // Métodos auxiliares para manejar tokens de forma segura
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}