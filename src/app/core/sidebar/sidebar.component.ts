import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importa CommonModule para usar *ngIf e *ngFor
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isProcessosSubMenuVisible: boolean = false;
  isFornecedoresSubMenuVisible: boolean = false; 
  toggleProcessosSubMenu(): void {
    console.log("opa")
    this.isProcessosSubMenuVisible = !this.isProcessosSubMenuVisible;
  }
  
  // Método para alternar a visibilidade do submenu de Fornecedores
  toggleFornecedoresSubMenu(): void {
    console.log("aqui")

    this.isFornecedoresSubMenuVisible = !this.isFornecedoresSubMenuVisible;
  }

}
