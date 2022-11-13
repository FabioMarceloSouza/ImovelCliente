import { Component, OnInit } from '@angular/core';
import { ResposnseApiCliente } from 'src/app/models/responseClienteApi.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss']
})
export class HomeClienteComponent implements OnInit {
  clientes: ResposnseApiCliente[] = [];
  modelDelete: any = {
    abrir: false,
    clienteId: 0
  };

  modal: boolean = false;
  search: string = "";
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.clienteService.getAllClientes().subscribe({
      next: (response) => {
        console.log(response)
        this.clientes = response.filter(p => p.active === true);
      }
    });
  }

  public handleDelete(id: number) {
     let cliente  = this.clientes.filter( e => e.id === id);
     if(cliente[0].imovels.length > 0){
      this.modal =  true;
     }else {
      this.modelDelete.abrir = true;
      this.modelDelete.clienteId = id;
     }

  }

  public naoDeletar(){
    this.modelDelete.abrir = false;
  }

  public deletar(){
    this.clienteService.deleteCliente(this.modelDelete.clienteId);
    this.clienteService.getAllClientes().subscribe({
      next: (response) => {
        this.clientes = response.filter(p => p.active === true);
      }
    });
  }

  public fecharModal(){
    this.modal = false;
  }

  public handleSearchInput(){
    if(this.search === "") {
      this.clienteService.getAllClientes().subscribe({
        next: (response) => {
          this.clientes = response.filter(p => p.active === true);
        }
      });
    }

    let list  = this.clientes.filter(
      e => e.name.toLowerCase().trim().includes( this.search.toLowerCase().trim()) ||
      e.cpfOuCnpj.toLowerCase().trim().includes( this.search.toLowerCase().trim())
      );
    this.clientes = list;
  }

}
