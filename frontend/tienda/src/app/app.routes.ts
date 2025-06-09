import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudComponent } from './components/crud/crud.component';
import { ContactComponent } from './components/contact/contact.component';

import { HomeComponent } from './components/home/home.component';
import { EventoFormComponent } from './components/evento-form/evento-form.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { RegistroComponent } from './components/registro/registro.component';

import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'eventos', component: EventoListComponent },
  { path: 'agregar-evento', component: EventoFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'crud', component: CrudComponent },
  { path: 'contact', component: ContactComponent },
  {path : 'publicaciones', component: PublicacionesComponent },
 { path: 'registro', component: RegistroComponent },
 { path: 'login', component: LoginComponent },
  // 👉 Nuevas rutas de eventos
  { path: 'eventos', component: EventoListComponent },
  { path: 'eventos/crear', component: EventoFormComponent },
  { path: 'eventos/editar/:id', component: EventoFormComponent },

  // Si mantienes el form dinámico

];
