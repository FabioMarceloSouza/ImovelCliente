import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Imovels } from 'src/app/models/Imovels.model';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-details-imovel-cliente',
  templateUrl: './details-imovel-cliente.component.html',
  styleUrls: ['./details-imovel-cliente.component.scss']
})
export class DetailsImovelClienteComponent implements OnInit {

  imovel!: Imovels;

  constructor(
    private imovelService : ImovelService,
    private activedRoute : ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit(): void {

    this.activedRoute.params.subscribe(e => {
      this.imovelService.getImovel(e['id']).subscribe({
        next: (response) => {

            if(response.tipoImovel === 1){
              response.tipoImovel = "Venda"
            }
            if(response.tipoImovel === 2){
              response.tipoImovel = "Aluguél"
            }

            this.imovel = response;

            console.log(response)
        }
      });
    });
  }

}
