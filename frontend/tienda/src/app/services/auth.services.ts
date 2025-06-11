import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  checkSession() {
    this.http.get<{ loggedIn: boolean }>('http://localhost:8080/api/session/status', { withCredentials: true })
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
