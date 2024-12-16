import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCnpjMask]'  // Nome da diretiva que será usada no HTML
})
export class CnpjMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let inputValue = this.el.nativeElement.value;

    // Remove qualquer coisa que não seja número
    inputValue = inputValue.replace(/\D/g, '');

    // Aplica a máscara de CNPJ (xx.xxx.xxx/xxxx-xx)
    if (inputValue.length <= 14) {
      inputValue = inputValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    this.el.nativeElement.value = inputValue;
  }
}
