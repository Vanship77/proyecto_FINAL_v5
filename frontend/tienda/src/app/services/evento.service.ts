import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({ providedIn: 'root' })
export class EventoService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url; // base URL de la API, ej: http://localhost:3000/api/eventos
  }

  getEventos(): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.url);
  }

  getEvento(id: string): Observable<Evento> {
    return this._http.get<Evento>(`${this.url}/${id}`);
  }

  addEvento(evento: Evento): Observable<Evento> {
    return this._http.post<Evento>(this.url, evento);
  }

  updateEvento(id: string, evento: Evento): Observable<Evento> {
    return this._http.put<Evento>(`${this.url}/${id}`, evento);
  }

  deleteEvento(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`);
  }
}
