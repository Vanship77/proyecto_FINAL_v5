import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface UserSession {
  loggedIn: boolean;
  user?: {
    name: string;
    email: string;
    provider?: 'local' | 'google' | 'github';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userData = new BehaviorSubject<{name: string, provider?: string} | null>(null);
  
  isLoggedIn$ = this.loggedIn.asObservable();
  userData$ = this.userData.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkSession();
  }

  checkSession() {
    this.http.get<{ loggedIn: boolean }>('http://localhost:8080/api/sesion/api/sesion', { withCredentials: true })
      .subscribe({
        next: res => this.loggedIn.next(res.loggedIn),
        error: () => this.loggedIn.next(false)
      });
  }

  logout() {
    this.http.get('http://localhost:8080/logout', { withCredentials: true })
      .subscribe({
        next: () => this.loggedIn.next(false),
        error: () => this.loggedIn.next(false)
      });
  }
}
