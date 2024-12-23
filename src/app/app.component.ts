import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';  // Importando RouterOutlet e RouterModule
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';  // Seu componente desejado

// Definindo as rotas
const routes: Routes = [
  { path: '', component: InicioComponent },  // Rota padrão (inicial)
  // Outras rotas podem ser adicionadas aqui
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,  // Apenas importa RouterModule (sem o 'forRoot')
    RouterOutlet,  // Para renderizar as rotas
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GPL';
}

