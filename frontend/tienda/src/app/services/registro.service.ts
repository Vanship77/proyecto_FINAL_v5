import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:8080/api/register'; // cambia si es necesario

  constructor(private http: HttpClient) {}

  registrarUsuario(formData: FormData): Observable<any> {
  return this.http.post(this.apiUrl, formData);
}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
