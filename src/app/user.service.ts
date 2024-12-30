import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userNameSubject = new BehaviorSubject<string>('');  // Valor inicial vazio
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);  // Controle de autenticação
  userName$ = this.userNameSubject.asObservable();  // Observable para o nome do usuário
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();  // Observable para autenticação

  constructor() {
    // Verifique se o código está sendo executado no lado do cliente (navegador)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUserName = localStorage.getItem('userName');
      const token = this.getTokenFromCookie();  // Verificar token de autenticação no cookie
      if (savedUserName) {
        this.userNameSubject.next(savedUserName);
      }
      if (token) {
        // Se o token estiver presente, o usuário está autenticado
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  setUserName(name: string): void {
    this.userNameSubject.next(name);  // Atualiza o nome do usuário
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userName', name);
    }
  }

  getUserName(): string {
    return this.userNameSubject.getValue();  // Obtém o valor atual do nome
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);  // Atualiza o estado de autenticação
  }

  getTokenFromCookie(): string {
    const name = 'accessToken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
