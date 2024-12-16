import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Mantendo o RouterOutlet
import { RouterModule } from '@angular/router';  // Importando o RouterModule
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,  // Importando o RouterModule para que as rotas funcionem
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrigindo para styleUrls
})
export class AppComponent {
  title = 'GPL';
}
