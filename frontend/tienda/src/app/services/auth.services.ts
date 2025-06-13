import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  checkSession() {
    this.http.get<UserSession>('http://localhost:8080/api/sesion/api/sesion', { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.loggedIn.next(res.loggedIn);
          if (res.loggedIn && res.user) {
            this.userData.next({
              name: res.user.name || this.extractNameFromEmail(res.user.email),
              provider: res.user.provider
            });
          } else {
            this.userData.next(null);
          }
        },
        error: () => {
          this.loggedIn.next(false);
          this.userData.next(null);
        }
      });
  }

  private extractNameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  logout() {
    this.http.get('http://localhost:8080/logout', { withCredentials: true })
      .subscribe({
        next: () => {
          this.loggedIn.next(false);
          this.userData.next(null);
        },
        error: () => {
          this.loggedIn.next(false);
          this.userData.next(null);
        }
      });
  }
}