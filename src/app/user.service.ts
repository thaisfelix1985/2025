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
    console.log("Atualizando nome para:", name); // Log para verificar se o nome está sendo atualizado corretamente
    this.userNameSubject.next(name); // Atualiza o nome no BehaviorSubject
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userName', name); // Salva o nome no localStorage
    }
  }

  getUserName(): string {
    return this.userNameSubject.getValue();  // Obtém o valor atual do nome
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);  // Atualiza o estado de autenticação
  }

  // Salva o token no cookie
  saveTokenInCookie(token: string): void {
    if (typeof document !== 'undefined') {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + 3600);  // O cookie expira em 1 hora
      document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
      console.log('Token salvo no cookie');
    } else {
      console.error('O método saveTokenInCookie só pode ser executado no navegador.');
    }
  }

  // Recupera o token do cookie
  getTokenFromCookie(): string {
    if (typeof document !== 'undefined') {
      const name = 'accessToken=';
      const decodedCookie = decodeURIComponent(document.cookie);  // Decodifica o cookie
      const ca = decodedCookie.split(';');  // Separa os cookies
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();  // Remove espaços extras
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);  // Retorna o token
        }
      }
      return '';  // Se o token não for encontrado, retorna string vazia
    } else {
      console.error('O método getTokenFromCookie só pode ser executado no navegador.');
      return '';  // Retorna string vazia se o método for executado fora do navegador
    }
  }
}

