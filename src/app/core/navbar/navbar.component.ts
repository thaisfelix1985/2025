import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterOutlet]
})
export class NavbarComponent implements OnInit {
  userName$: Observable<string>;  // Tornar userName um Observable diretamente
  nome?: string;

  constructor(private userService: UserService) {
    // Inicia a inscrição diretamente no Observable
    this.userName$ = this.userService.userName$;
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const nome = localStorage.getItem('userName'); // Acessa apenas no navegador
      if (nome) {
        this.nome = nome;
      } else {
        console.warn('Nome não encontrado no localStorage.');
      }
    } else {
      console.error('localStorage não está disponível no ambiente atual.');
    }
  }
}