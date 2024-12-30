import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  userName$: Observable<string>;  // Tornar userName um Observable diretamente

  constructor(private userService: UserService) {
    // Inicia a inscrição diretamente no Observable
    this.userName$ = this.userService.userName$;
  }

  ngOnInit() {
    this.userName$.subscribe(name => {
      console.log('Nome do usuário atualizado no navbar:', name);
    });
  }
}