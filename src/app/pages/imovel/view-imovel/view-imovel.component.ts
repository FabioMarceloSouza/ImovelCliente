import { Component, OnInit } from '@angular/core';
import { Imovels } from 'src/app/models/Imovels.model';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-view-imovel',
  templateUrl: './view-imovel.component.html',
  styleUrls: ['./view-imovel.component.scss']
})
export class ViewImovelComponent implements OnInit {
  imovels : Imovels[] = [];
  modelDelete: any = {
    abrir: false,
    imovelId: 0
  };
  constructor(private imovelService: ImovelService) { }

  ngOnInit(): void {

    this.imovelService.getImoveis().subscribe({
      next: (response) => {
        let imovels = response.map( (x: any)=> {
          if(x.tipoImovel === 1){
            x.tipoImovel = "Venda"
          }
          if(x.tipoImovel === 2){
            x.tipoImovel = "Aluguel"
          }

          return x;
        });

        response.imovels = imovels;

        this.imovels = response;
      }
    });
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
    this.imovelService.getImoveis().subscribe({
      next: (response) => {
        let imovels = response.map( (x: any)=> {
          if(x.tipoImovel === 1){
            x.tipoImovel = "Venda"
          }
          if(x.tipoImovel === 2){
            x.tipoImovel = "Aluguel"
          }

          return x;
        });

        response.imovels = imovels;

        this.imovels = response;

      }
    });
  }

}
