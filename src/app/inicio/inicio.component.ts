import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { FooterComponent } from '../core/footer/footer.component';
import { SidebarComponent } from '../core/sidebar/sidebar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [CommonModule, RouterModule,NavbarComponent, FooterComponent, SidebarComponent],
})
export class InicioComponent {

}


