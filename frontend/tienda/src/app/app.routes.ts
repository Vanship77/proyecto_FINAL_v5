

import { Routes } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudComponent } from './components/crud/crud.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { EventoFormComponent } from './components/evento-form/evento-form.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { Publicaciones2Component } from './components/publicaciones2/publicaciones2.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SuccessComponent } from './components/success/success.component';


// Importa aquí tu componente SaberMasComponent
import { SaberMasComponent } from './components/saber.mas/saber.mas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'crud', component: CrudComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'perfil', component: PerfilComponent },

  // Nueva ruta para Saber Más
  { path: 'saber.mas', component: SaberMasComponent },

  // Eventos
  { path: 'eventos', component: EventoListComponent },
  { path: 'eventos/crear', component: EventoFormComponent },
  { path: 'eventos/editar/:id', component: EventoFormComponent },

  // Publicaciones
  { path: 'publicaciones', component: Publicaciones2Component },
  { path: 'publicaciones2', component: PublicacionesComponent },

  // Ruta 404 si quieres
  // { path: '**', component: NotFoundComponent }
];
