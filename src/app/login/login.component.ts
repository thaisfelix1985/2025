import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorMessage: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  enviarCredenciais(formData: { username: string; password: string }) {
    formData.username = String(formData.username);
    formData.password = String(formData.password);
    console.log('Credenciais enviadas:', formData); // Adicionando log para verificar os dados
  }

  onSubmit() {
    console.log('Formulário enviado', this.loginForm.value); // Verificar o conteúdo do formulário antes de enviar

    if (this.loginForm.invalid) {
      console.log('Formulário inválido'); // Log de erro caso o formulário seja inválido
      this.showErrorMessage = true;
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isSubmitting = true;
    const formData = this.loginForm.value;

    this.enviarCredenciais(formData);

    console.log(
      'Dados que serão enviados para a API:',
      JSON.stringify(formData, null, 2)
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post('http://10.1.72.147:80/api-gpl/Api/Login/login', formData, {
        headers,
        responseType: 'text', // Mantém o retorno como texto
      })
      .subscribe({
        next: (response: any) => {
          console.log('Login realizado com sucesso!', response);

          // Salva o token no cookie
          this.saveTokenInCookie(response);
          console.log('Token salvo no cookie com sucesso!');
          
          this.obterDadosToken(); // Chama o método para obter os dados do usuário
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

  // Função para salvar o token no cookie
  saveTokenInCookie(token: string) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 3600); // O cookie vai expirar em 1 hora
    document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
  }

  // Função para pegar o token do cookie
  getTokenFromCookie() {
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

  // Função para obter os dados do usuário usando o token
  obterDadosToken() {
    const token = this.getTokenFromCookie();
    console.log('Token obtido:', token); // Log para verificar se o token foi salvo corretamente

    if (!token) {
      this.errorMessage = 'Token não encontrado. Faça login novamente.';
      this.showErrorMessage = true;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log('Fazendo requisição para obter dados do usuário com token'); // Log da requisição para obter os dados do usuário

    this.http
      .get('http://10.1.72.147/api-gpl/Api/Login/obter-cookie', { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Dados do usuário:', response);
          localStorage.setItem('userDetails', JSON.stringify(response));
          console.log('Redirecionando para /inicio...');
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          console.error('Erro ao obter informações do usuário:', error);
          this.errorMessage =
            'Erro ao obter informações do usuário. Tente novamente mais tarde.';
          this.showErrorMessage = true;
        },
      });
  }

  clearErrorMessages() {
    console.log('Mensagens de erro limpas'); // Log ao limpar mensagens de erro
    this.showErrorMessage = false;
    this.errorMessage = '';
  }
}















