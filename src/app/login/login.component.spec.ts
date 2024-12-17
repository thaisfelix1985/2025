import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // Form inválido por padrão
    expect(button.disabled).toBeTrue();
  });

  it('should enable the submit button when form is valid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // Atualizar valores do formulário
    component.loginForm.setValue({
      email: 'teste@email.com',
      password: '123456',
    });
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });

  it('should call the API and receive a token on successful login', () => {
    const mockResponse = { token: 'fake-token' };

    // Atualizar valores do formulário
    component.loginForm.setValue({
      email: 'teste@email.com',
      password: '123456',
    });

    // Simular o envio do formulário
    component.onSubmit();
    const req = httpMock.expectOne('http://10.1.72.147/api-gpl/Api/Login/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      UserName: 'teste@email.com',
      Password: '123456',
    });

    // Simular resposta bem-sucedida da API
    req.flush(mockResponse);

    // Validar que o token foi salvo corretamente
    expect(localStorage.getItem('authToken')).toBe('fake-token');
  });

  it('should handle API errors gracefully', () => {
    const mockError = { message: 'Invalid credentials' };

    // Atualizar valores do formulário
    component.loginForm.setValue({
      email: 'invalid@email.com',
      password: 'wrongpassword',
    });

    // Simular o envio do formulário
    component.onSubmit();
    const req = httpMock.expectOne('http://10.1.72.147/api-gpl/Api/Login/login');

    // Simular erro na resposta da API
    req.flush(mockError, { status: 401, statusText: 'Unauthorized' });

    // Validar que o erro foi tratado corretamente
    expect(component.errorMessage).toBe('Invalid credentials');
  });

  
});




