import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  // Para testes de HTTP
import { HomeComponent } from './home.component';  // Importando o HomeComponent standalone

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;  // Controlador para simular as requisições HTTP

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,  // Necessário para formulários reativos
        HttpClientTestingModule,  // Necessário para testar requisições HTTP
        HomeComponent  // Importa o componente standalone diretamente
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);  // Injeta o controlador HTTP
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica se o componente foi criado corretamente
  });

  it('should submit the form data to the API', () => {
    const dadosParaEnviar = component.formulario.value;  // Obtém os dados do formulário

    // Chama o método onSubmit do componente
    component.onSubmit();

    // Simula a requisição HTTP e verifica se os dados foram enviados corretamente
    const req = httpMock.expectOne('http://10.1.72.147:80/api-gpl/Api/Unidade/ProcessoCadastro');
    expect(req.request.method).toBe('POST');  // Verifica se o método da requisição é POST
    expect(req.request.body).toEqual(dadosParaEnviar);  // Verifica se o corpo da requisição contém os dados do formulário

    // Responde a requisição com sucesso
    req.flush({ success: true });

    // Verifica se a resposta foi recebida corretamente
    httpMock.verify();
  });

  afterEach(() => {
    // Verifica se não há requisições HTTP pendentes
    httpMock.verify();
  });
});
