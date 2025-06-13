// src/app/services/auth.services.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface UserSession {
  loggedIn: boolean;
  user?: {
    name: string;
    email: string;
    provider?: 'local' | 'google' | 'github' | 'jwt';
    role: string;
  };
}

interface User {
  name: string;
  email?: string;
  provider?: 'local' | 'google' | 'github' | 'jwt';
  role: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userData = new BehaviorSubject<User | null>(null);
  
  isLoggedIn$ = this.loggedIn.asObservable();
  userData$ = this.userData.asObservable();

  constructor(private http: HttpClient,private router: Router) {
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
              email: res.user.email,
              provider: res.user.provider,
              role: res.user.role,
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

  // Usado por LoginService luego del login exitoso
  setJWTUser(user: any) {
    const jwtUser: User = {
      name: user.firstName,
      email: user.email,
      provider: 'jwt',
      role: user.role,
      id: user.id
    };
    this.loggedIn.next(true);
    this.userData.next(jwtUser);
  }

  hasRole(requiredRole: string): boolean {
    const user = this.userData.value;
    return user?.role === requiredRole;
  }

  getCurrentUser(): User | null {
    return this.userData.value;
  }

  private extractNameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  logout() {
    this.http.post('http://localhost:8080/logout', { withCredentials: true })
      .subscribe({
        next: () => {
          this.loggedIn.next(false);
          this.userData.next(null);
          this.router.navigate(['/']);
        },
        error: () => {
          this.loggedIn.next(false);
          this.userData.next(null);
        }
      });
  }
}
