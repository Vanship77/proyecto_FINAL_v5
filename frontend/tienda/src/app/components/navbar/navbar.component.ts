import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sidebarOpen = false;
  sidebar2Open = false;
  isLoggedIn = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleSidebar2() {
    this.sidebar2Open = !this.sidebar2Open;
  }

  logout() {
    this.isLoggedIn = false;
    console.log('👋 Sesión cerrada');
  }

  startSimulation() {
    if (!this.isLoggedIn) {
      this.isLoggedIn = true;
      console.log('🚀 Sesión iniciada');
    } else {
      this.logout();
    }
  }
}
