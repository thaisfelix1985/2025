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
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        LoginComponent // Importa o componente standalone diretamente
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form controls', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    expect(usernameControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();

    usernameControl?.setValue('validUser');
    passwordControl?.setValue('validPassword');

    expect(usernameControl?.valid).toBeTrue();
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should submit the form data to the API and handle the token response', () => {
    const formData = { username: 'testUser', password: 'testPassword' };

    component.loginForm.setValue(formData);
    component.onSubmit();

    const loginRequest = httpMock.expectOne('http://10.1.72.147:80/api-gpl/Api/Login/login');
    expect(loginRequest.request.method).toBe('POST');
    expect(loginRequest.request.body).toEqual(formData);

    const mockTokenResponse = { token: 'mocked-jwt-token' };
    loginRequest.flush(mockTokenResponse);

    expect(localStorage.getItem('accessToken')).toBe(mockTokenResponse.token);
  });

  it('should fetch and save user details after obtaining the token', () => {
    const mockToken = 'mocked-jwt-token';
    localStorage.setItem('accessToken', mockToken);

    component.obterDadosToken();

    const userDetailsRequest = httpMock.expectOne('http://10.1.72.147:80/api-gpl/Api/Login/obter-cookie');
    expect(userDetailsRequest.request.method).toBe('GET');
    expect(userDetailsRequest.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    const mockUserDetails = [
      { tipo: 'username', valor: '3058880' },
      { tipo: 'Perfil', valor: '1' },
      { tipo: 'Unidade', valor: '1' },
      { tipo: 'nome', valor: 'Luís Guilherme Ribeiro Teixeira' }
    ];

    userDetailsRequest.flush(mockUserDetails);

    const savedUserDetails = JSON.parse(localStorage.getItem('userDetails') || '[]');
    expect(savedUserDetails).toEqual(mockUserDetails);
  });

  it('should handle API errors gracefully during login', () => {
    const formData = { username: 'testUser', password: 'wrongPassword' };

    component.loginForm.setValue(formData);
    component.onSubmit();

    const loginRequest = httpMock.expectOne('http://10.1.72.147:80/api-gpl/Api/Login/login');
    loginRequest.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });

    expect(component.errorMessage).toBe('Usuário ou senha inválidos. Tente novamente.');
    expect(component.showErrorMessage).toBeTrue();
  });

  it('should handle API errors gracefully during user data fetch', () => {
    const mockToken = 'mocked-jwt-token';
    localStorage.setItem('accessToken', mockToken);

    component.obterDadosToken();

    const userDetailsRequest = httpMock.expectOne('http://10.1.72.147:80/api-gpl/Api/Login/obter-cookie');
    userDetailsRequest.flush('Error fetching data', { status: 500, statusText: 'Internal Server Error' });

    expect(component.errorMessage).toBe('Erro ao obter informações do usuário. Tente novamente mais tarde.');
    expect(component.showErrorMessage).toBeTrue();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });
});


