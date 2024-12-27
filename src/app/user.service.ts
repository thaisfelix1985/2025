import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userNameSubject = new BehaviorSubject<string>('');  // Valor inicial vazio
  userName$ = this.userNameSubject.asObservable();  // Observable para ser usado nos componentes

  constructor() {
    // Verifique se o código está sendo executado no lado do cliente (navegador)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUserName = localStorage.getItem('userName');
      if (savedUserName) {
        // Se o nome estiver armazenado no localStorage, atualiza o BehaviorSubject
        this.userNameSubject.next(savedUserName);
      }
    }
  }

  setUserName(name: string): void {
    this.userNameSubject.next(name);  // Atualiza o nome do usuário
    // Verifique se o código está sendo executado no lado do cliente (navegador)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userName', name);
    }
  }

  getUserName(): string {
    return this.userNameSubject.getValue();  // Obtém o valor atual do nome
  }
}





