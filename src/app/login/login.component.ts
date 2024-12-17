import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Para navegação após login

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorMessage: boolean = false;
  isSubmitting: boolean = false; // Para controlar o estado de carregamento
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Injetando o Router para redirecionamentos
  ) {
    // Inicializando o formulário de login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validação de e-mail
      password: ['', Validators.required]
    });
  }

  // Função para enviar os dados para a API
  onSubmit() {
    if (this.loginForm.invalid) {
      this.showErrorMessage = true; // Exibe erro se o formulário for inválido
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isSubmitting = true; // Ativa o estado de carregamento
    const formData = this.loginForm.value;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const apiUrl = 'http://10.1.72.147/api-gpl/Api/Login/login';
    const body = {
      UserName: formData.email, // Mapeando campo do formulário
      Password: formData.password
    };

    // Envia os dados para a API
    this.http.post(apiUrl, body, { headers }).subscribe({
      next: (response: any) => {
        console.log('Login bem-sucedido:', response);
        this.isSubmitting = false;
        localStorage.setItem('accessToken', response.token); // Salva o token no localStorage
        alert('Login realizado com sucesso!');

        // Redireciona para outra página (exemplo: dashboard)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erro ao realizar login:', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Erro ao realizar o login. Tente novamente.';
      }
    });
  }

  // Função para limpar mensagens de erro ao modificar campos
  clearErrorMessages() {
    this.showErrorMessage = false;
    this.errorMessage = '';
  }
}



