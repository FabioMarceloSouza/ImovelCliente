import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImovelService } from 'src/app/services/imovel.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-create-imovel-cliente',
  templateUrl: './create-imovel-cliente.component.html',
  styleUrls: ['./create-imovel-cliente.component.scss']
})
export class CreateImovelClienteComponent implements OnInit {
  formImovel: FormGroup = new FormGroup({
    valorImovel: new FormControl( [Validators.required]),
    tipoImovel: new FormControl("", [Validators.required]),
    descricao: new FormControl("", [Validators.required]),
    dataPublicacao: new FormControl("", [Validators.required]),
    cep: new FormControl("", [Validators.required]),
    logradouro: new FormControl("", [Validators.required]),
    complemento: new FormControl("", [Validators.required]),
    bairro: new FormControl("", [Validators.required]),
    localidade: new FormControl("", [Validators.required]),
    uf: new FormControl("", [Validators.required]),
    clienteId: new FormControl([Validators.required]),
  });

  constructor(
    private imovelService: ImovelService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private cepService: CepService
    ) { }

  ngOnInit(): void {

    this.routerActive.params.subscribe(e => {
      this.formImovel.get('clienteId')?.setValue(e['id'])
    });
  }


  public handleSubmit(){
    if(!this.formImovel.valid){
      return;
    }

    this.imovelService.createImovel(this.formImovel.value).subscribe({
      next: (response) => {
         this.router.navigate(['/']);
      }
    });
  }

  public buscarCep(){
    let cep = this.formImovel.get('cep')?.value;
    this.cepService.getCep(cep).subscribe({
      next: (response) => {
          if(response.cep === null){
            alert("Cep não existe");
          }

          this.formImovel.get('logradouro')?.setValue(response.logradouro);
          this.formImovel.get('bairro')?.setValue(response.bairro);
          this.formImovel.get('localidade')?.setValue(response.localidade);
          this.formImovel.get('uf')?.setValue(response.uf);
      },
      error(err) {
        if(err.error.erro){
          alert("Cep não existe");
        }
      },
    });
  }

  get validacaoImovel () {
    return {
      valorImovel: this.formImovel.get('valorImovel'),
      tipoImovel: this.formImovel.get('tipoImovel'),
      descricao: this.formImovel.get('descricao'),
      dataPublicacao: this.formImovel.get('dataPublicacao'),
      cep: this.formImovel.get('cep'),
      logradouro: this.formImovel.get('logradouro'),
      bairro: this.formImovel.get('bairro'),
      localidade: this.formImovel.get('localidade'),
      complemento: this.formImovel.get('complemento'),
      uf: this.formImovel.get('uf')
    }
  }

}
