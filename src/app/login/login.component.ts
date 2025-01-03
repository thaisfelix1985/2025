import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorMessage: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  enviarCredenciais(formData: { username: string; password: string }) {
    formData.username = String(formData.username);
    formData.password = String(formData.password);
    console.log('Credenciais enviadas:', formData);
  }

  onSubmit() {
    console.log('Formulário enviado', this.loginForm.value);

    if (this.loginForm.invalid) {
      console.log('Formulário inválido');
      this.showErrorMessage = true;
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isSubmitting = true;
    const formData = this.loginForm.value;

    this.enviarCredenciais(formData);

    console.log('Dados que serão enviados para a API:', JSON.stringify(formData, null, 2));

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post('http://10.1.72.147:80/api-gpl/Api/Login/login', formData, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (response: any) => {
          console.log('Login realizado com sucesso!', response);
          this.saveTokenInCookie(response);
          this.obterDadosToken();
        },
        error: (error) => {
          console.error('Erro ao realizar o login:', error);
          this.errorMessage = 'Usuário ou senha inválidos. Tente novamente.';
          this.showErrorMessage = true;
        },
        complete: () => {
          this.isSubmitting = false;
          console.log('Processo de login concluído');
        },
      });
  }

  // Salva o token nos cookies
  saveTokenInCookie(token: string) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 3600);  // O cookie vai expirar em 1 hora
    document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
    console.log('Token salvo no cookie');
  }

  // Recupera o token dos cookies
  getTokenFromCookie(): string {
    const name = 'accessToken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);  // Retorna o token encontrado
      }
    }
    return '';  // Se não encontrar o token, retorna uma string vazia
  }

  // Obtém os dados do token e atualiza o nome do usuário
  obterDadosToken() {
    const token = this.getTokenFromCookie();
    console.log('Token obtido:', token);

    if (!token) {
      this.errorMessage = 'Token não encontrado. Faça login novamente.';
      this.showErrorMessage = true;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get('http://10.1.72.147/api-gpl/Api/Login/obter-cookie', { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Dados do usuário:', response);

          if (Array.isArray(response)) {
            const nomeItem = response.find(item => item.tipo === 'nome');

            if (nomeItem && nomeItem.valor) {
              // Atualiza o nome do usuário no UserService
              console.log('Nome do usuário encontrado:', nomeItem.valor);
              this.userService.setUserName(nomeItem.valor);
              console.log("Nome do usuário após login:", nomeItem.valor);

              // Armazena o nome no localStorage para persistência
              localStorage.setItem('userName', nomeItem.valor);
              console.log('Nome atualizado no UserService:', nomeItem.valor);

              // Agora, nos inscrevemos no UserService para garantir que a navegação ocorra após o nome ser atualizado.
              this.userService.userName$.subscribe(name => {
                if (name) {
                  console.log('Nome atualizado:', name);
                  // Navega para a página de início após a atualização do nome
                  setTimeout(() =>{
                    this.router.navigate(['/inicio']);
                  }, 3000)
                }
              });
            } else {
              console.error('Nome do usuário não encontrado no array:', response);
            }
          }
        },
        error: (error) => {
          console.error('Erro ao obter informações do usuário:', error);
          this.errorMessage = 'Erro ao obter informações do usuário. Tente novamente mais tarde.';
          this.showErrorMessage = true;
        },
      });
  }

  clearErrorMessages() {
    console.log('Mensagens de erro limpas');
    this.showErrorMessage = false;
    this.errorMessage = '';
  }
}





















