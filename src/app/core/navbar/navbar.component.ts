import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName: string = '';  // Variável para armazenar o nome do usuário

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,  // Injeção do ChangeDetectorRef
    private ngZone: NgZone  // Injeção do NgZone
  ) {}

  ngOnInit(): void {
    // Inscreve-se para observar as mudanças no nome do usuário
    this.userService.userName$.subscribe((name) => {
      this.userName = name;  // Atualiza o nome do usuário quando ele mudar

      // Força a detecção de mudanças dentro do contexto do Angular
      this.ngZone.run(() => {
        // Chama detectChanges para forçar a atualização da UI
        this.cdr.detectChanges();
      });

      // Verifique no console se o nome está sendo corretamente atualizado
      console.log('Nome do usuário atualizado no Navbar:', this.userName);
    });
  }
}
