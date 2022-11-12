import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteRequest } from 'src/app/models/clienteRequest.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ValidacoesCnpj } from 'src/app/validators/validaCnpj';
import { Validacoes } from 'src/app/validators/validaCpf';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.scss']
})
export class CreateClienteComponent  {

  cpf: boolean  = true;
  cnpj: boolean  = false;
  checked: string = "cpf"
  formCliente: FormGroup = new FormGroup({
    name: new FormControl("", [ Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [ Validators.required, Validators.email]),
    cpfOuCnpj: new FormControl("", [Validators.required, this.checked == "cpf" ? Validacoes.ValidaCpf : ValidacoesCnpj.ValidaCnpj])
  });

  constructor(private clienteService : ClienteService, private router: Router) { }


  public handleSubmit()
  {
    if(!this.formCliente.valid){
      return;
    }

    let cliente : ClienteRequest = {
      name: this.formCliente.get('name')?.value,
      email: this.formCliente.get('email')?.value,
      cpfOuCnpj: this.formCliente.get('cpfOuCnpj')?.value,
    };

    this.clienteService.createCliente(cliente).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      }
    });
  }

  get validaCliente() {
    return {
      name: this.formCliente.get('name'),
      email: this.formCliente.get('email'),
      cpfOuCnpj: this.formCliente.get('cpfOuCnpj'),
    }
  }


  handleChekedCpf() {
    this.formCliente.get('cpfOuCnpj')?.setValue("");
    this.checked = 'cpf'
  }
  handleChekedCnpj() {
    this.formCliente.get('cpfOuCnpj')?.setValue("");
    this.checked = 'cnpj'
  }
}
