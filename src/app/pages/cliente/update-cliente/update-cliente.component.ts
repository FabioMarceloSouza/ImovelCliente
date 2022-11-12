import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ValidacoesCnpj } from 'src/app/validators/validaCnpj';
import { Validacoes } from 'src/app/validators/validaCpf';

@Component({
  selector: 'app-update-cliente',
  templateUrl: './update-cliente.component.html',
  styleUrls: ['./update-cliente.component.scss']
})
export class UpdateClienteComponent implements OnInit {

  cpf: boolean  = true;
  cnpj: boolean  = false;
  cliente!: Cliente;
  checked: string = "cpf"
  formCliente: FormGroup = new FormGroup({
    name: new FormControl("", [ Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [ Validators.required, Validators.email]),
    cpfOuCnpj: new FormControl("", [Validators.required, this.checked == "cpf" ? Validacoes.ValidaCpf : ValidacoesCnpj.ValidaCnpj])
  });

  constructor(private clienteService : ClienteService, private router: Router, private routerActive: ActivatedRoute ) { }
  ngOnInit(): void {
    this.routerActive.params.subscribe(e => {
        this.clienteService.getCliente(e['id']).subscribe({
          next: (response) => {
            if(response.cpfOuCnpj.replace(" ", "").length === 11){
              this.checked = "cpf"
            }else {
              this.checked = "cnpj"
            }
            this.formCliente.get('name')?.setValue(response.name);
            this.formCliente.get('email')?.setValue(response.email);
            this.formCliente.get('cpfOuCnpj')?.setValue(response.cpfOuCnpj);

            this.cliente = response;
          }
        });
    });
  }


  public handleSubmit()
  {
    if(!this.formCliente.valid){
      return;
    }
    let cliente: Cliente =  {
      id: this.cliente.id,
      active: this.cliente.active,
      name: this.formCliente.get('name')?.value,
      email: this.formCliente.get('email')?.value,
      cpfOuCnpj: this.formCliente.get('cpfOuCnpj')?.value
    };

    this.clienteService.updateCliente(cliente).subscribe({
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
