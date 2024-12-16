import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { TelaFrComponent } from './tela-fr/tela-fr.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'tela-fr', component: TelaFrComponent },
  // Defina outras rotas conforme necessário
];
