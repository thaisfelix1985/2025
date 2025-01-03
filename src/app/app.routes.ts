import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { TelaFrComponent } from './tela-fr/tela-fr.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'inicio', component: InicioComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tela-fr', component: TelaFrComponent },  
      // Defina outras rotas conforme necessário
    ]
   },

];
