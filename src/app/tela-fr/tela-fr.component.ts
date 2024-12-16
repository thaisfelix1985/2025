import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importação do CommonModule

@Component({
  selector: 'app-tela-fr',
  templateUrl: './tela-fr.component.html',
  styleUrls: ['./tela-fr.component.css'],
  standalone: true,  // Componente standalone
  imports: [ReactiveFormsModule, CommonModule]  // Adicionando CommonModule aqui
})
export class TelaFrComponent implements OnInit {
  form: FormGroup; // Definição do FormGroup
  currentDate: string;
  frCodes = [
    { value: '100', label: '100' },
    { value: '110', label: '108' },
    { value: '120', label: '113' },
    { value: '130', label: '119' },
    { value: '140', label: '124' },
    { value: '150', label: '156' },
    { value: '160', label: '180' },
    { value: '170', label: '181' },
    { value: '180', label: '182' },
    { value: '190', label: '183' },
    { value: '200', label: '184' },
    { value: '210', label: '185' },
    { value: '220', label: '196' },
    { value: '230', label: '197' },
    { value: '240', label: '199' }
  ];

  // Variáveis para controlar a visibilidade do submenu
  isProcessosSubMenuVisible: boolean = false;
  isFornecedoresSubMenuVisible: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedFR: ['', Validators.required],  // Campo obrigatório
      valor: ['', Validators.required]  // Campo obrigatório
    });

    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {}

  // Método para alternar a visibilidade do submenu de Processos
  toggleProcessosSubMenu(): void {
    this.isProcessosSubMenuVisible = !this.isProcessosSubMenuVisible;
  }

  // Método para alternar a visibilidade do submenu de Fornecedores
  toggleFornecedoresSubMenu(): void {
    this.isFornecedoresSubMenuVisible = !this.isFornecedoresSubMenuVisible;
  }

  updateAvailableValue(): void {
    // Atualizar o valor com base na seleção do FR
  }

  submitForm(): void {
    if (this.form.valid) {
      alert("Valor incluído com sucesso!");
      setTimeout(() => {
        location.reload(); // Recarregar a página após 2 segundos
      }, 2000);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  }
}
