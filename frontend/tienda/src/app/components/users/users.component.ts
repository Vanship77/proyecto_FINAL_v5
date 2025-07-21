import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User, UserForm } from './user.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: UserForm = {
    firstName: '',
    email: '',
    role: 'user',
    isActive: true
  };
  isEditing = false;
  apiUrl = `${environment.apiBase}/users`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error loading users:', err)
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/${this.currentUser._id}`, this.currentUser)
        .subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
          },
          error: (err) => console.error('Error updating user:', err)
        });
    } else {
      this.http.post(this.apiUrl, this.currentUser)
        .subscribe({
          next: () => {
            this.loadUsers();
            this.resetForm();
          },
          error: (err) => console.error('Error creating user:', err)
        });
    }
  }

  editUser(user: User): void {
    this.currentUser = { ...user };
    this.isEditing = true;
  }

  deleteUser(id: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.http.delete(`${this.apiUrl}/${id}`)
        .subscribe({
          next: () => this.loadUsers(),
          error: (err) => console.error('Error deleting user:', err)
        });
    }
  }

  resetForm(): void {
    this.currentUser = {
      firstName: '',
      email: '',
      role: 'user',
      isActive: true
    };
    this.isEditing = false;
  }
}