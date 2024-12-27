import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName: string = '';  // Variável para armazenar o nome do usuário

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Inscreve-se para observar as mudanças no nome do usuário
    this.userService.userName$.subscribe((name) => {
      this.userName = name;  // Atualiza o nome do usuário quando ele mudar
    });
  }
  
}











