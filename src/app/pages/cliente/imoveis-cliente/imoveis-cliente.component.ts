import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResposnseApiCliente } from 'src/app/models/responseClienteApi.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-imoveis-cliente',
  templateUrl: './imoveis-cliente.component.html',
  styleUrls: ['./imoveis-cliente.component.scss']
})
export class ImoveisClienteComponent implements OnInit {
  cliente!: ResposnseApiCliente;
  modelDelete: any = {
    abrir: false,
    imovelId: 0
  };
  clienteId: any;
  constructor(
    private clienteService: ClienteService,
    private routerActiveted : ActivatedRoute,
    private imovelService: ImovelService) { }

  ngOnInit(): void {

    this.routerActiveted.params.subscribe( x => {
      this.clienteId = x['id'];
      this.clienteService.getCliente(x['id']).subscribe({
        next: (response : ResposnseApiCliente) => {

          let imovels = response.imovels.map( (x: any)=> {
            if(x.tipoImovel === 1){
              x.tipoImovel = "Venda"
            }
            if(x.tipoImovel === 2){
              x.tipoImovel = "Aluguel"
            }

            return x;
          });

          response.imovels = imovels;

          this.cliente = response;
          console.log(response);
        }
      });
    } );
  }

  public handleDelete(id: number) {
    this.modelDelete.abrir = true;
    this.modelDelete.imovelId = id;
  }

  public naoDeletar(){
    this.modelDelete.abrir = false;
  }

  public deletar(){
    this.imovelService.deleteImovel(this.modelDelete.imovelId);
    this.clienteService.getCliente(this.clienteId).subscribe({
      next: (response) => {
        let imovels = response.imovels.map( (x: any)=> {
          if(x.tipoImovel === 1){
            x.tipoImovel = "Venda"
          }
          if(x.tipoImovel === 2){
            x.tipoImovel = "Aluguel"
          }

          return x;
        });

        response.imovels = imovels;

        this.cliente = response;
        console.log(response);
      }
    });
  }
}
