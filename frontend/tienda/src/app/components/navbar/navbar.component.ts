import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, NgIf]
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Toggle del primer componente
  leftOpen = false;
  rightOpen = false;

  // Estado del segundo componente
  isLoggedIn = false;
  sub!: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
    this.auth.checkSession();
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Métodos del primer componente (toggleLeft, toggleRight)
  toggleLeft() {
    this.leftOpen = !this.leftOpen;
    if (this.leftOpen) this.rightOpen = false;
  }

  toggleRight() {
    this.rightOpen = !this.rightOpen;
    if (this.rightOpen) this.leftOpen = false;
  }

  // Métodos del segundo componente (login, logout, toggleSidebar)
  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/login/google';
  }

  loginWithGithub() {
    window.location.href = 'http://localhost:8080/login/github';
  }

  logout() {
    this.auth.logout();
  }

  // Toggle adicional del segundo componente (sidebarOpen, sidebar2Open)
  sidebarOpen = false;
  sidebar2Open = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSidebar2() {
    this.sidebar2Open = !this.sidebar2Open;
  }
}
