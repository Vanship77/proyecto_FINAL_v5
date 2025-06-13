// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.services';

interface LoginResponse {
  user: {
    id: string;
    firstName: string;
    email: string;
    photoUrl?: string;
    role: string;
  };
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/login';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.apiUrl,
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.authService.setJWTUser(response.user);
      })
    );
  }

  logout() {
    this.authService.logout();
  }
}
