import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [CommonModule, RouterModule],
})
export class InicioComponent {

 // Variáveis para controlar a visibilidade do submenu
 isProcessosSubMenuVisible: boolean = false;
 isFornecedoresSubMenuVisible: boolean = false; 

 // Método para alternar a visibilidade do submenu de Processos
 toggleProcessosSubMenu(): void {
  this.isProcessosSubMenuVisible = !this.isProcessosSubMenuVisible;
}

// Método para alternar a visibilidade do submenu de Fornecedores
toggleFornecedoresSubMenu(): void {
  this.isFornecedoresSubMenuVisible = !this.isFornecedoresSubMenuVisible;
}
}


