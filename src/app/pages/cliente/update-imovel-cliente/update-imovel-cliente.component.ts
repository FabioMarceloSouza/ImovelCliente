import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CepService } from 'src/app/services/cep.service';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-update-imovel-cliente',
  templateUrl: './update-imovel-cliente.component.html',
  styleUrls: ['./update-imovel-cliente.component.scss']
})
export class UpdateImovelClienteComponent implements OnInit {

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
    clienteId: new FormControl("",[Validators.required]),
  });
  imovel: any;

  constructor(
    private imovelService: ImovelService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cepService: CepService
    ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe( e => {
      this.imovelService.getImovel(e['id']).subscribe({
        next: (response) => {
        this.imovel = response;
        console.log(response)
        this.formImovel.get('valorImovel')?.setValue(response.valorImovel);
        this.formImovel.get('tipoImovel')?.setValue(response.tipoImovel);
        this.formImovel.get('descricao')?.setValue(response.descricao);
        this.formImovel.get('dataPublicacao')?.setValue(response.dataPublicao);
        this.formImovel.get('cep')?.setValue(response.cep);
        this.formImovel.get('logradouro')?.setValue(response.logradouro);
        this.formImovel.get('bairro')?.setValue(response.bairro);
        this.formImovel.get('localidade')?.setValue(response.localidade);
        this.formImovel.get('complemento')?.setValue(response.complemento);
        this.formImovel.get('uf')?.setValue(response.uf);
        this.formImovel.get('clienteId')?.setValue(response.clienteId)
        }
      });
    });
  }


  public handleSubmit(){
    if(!this.formImovel.valid){
      return;
    }

    this.imovelService.updateImovel(this.formImovel.value).subscribe({
      next: (response) => {
         this.router.navigate(['/imovies-cliente', this.imovel.cliente.id]);
      }
    });
  }

  public buscarCep(){
    let cep = this.formImovel.get('cep')?.value;
    this.cepService.getCep(cep).subscribe({
      next: (response) => {
          if(response.cep === null){
            alert("Cep n??o existe");
          }

          this.formImovel.get('logradouro')?.setValue(response.logradouro);
          this.formImovel.get('bairro')?.setValue(response.bairro);
          this.formImovel.get('localidade')?.setValue(response.localidade);
          this.formImovel.get('uf')?.setValue(response.uf);
      },
      error(err) {
        if(err.error.erro){
          alert("Cep n??o existe");
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
      uf: this.formImovel.get('uf'),
      clienteId: this.formImovel.get('clienteId')
    }
  }


}
