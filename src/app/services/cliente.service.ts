import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';
import { ClienteRequest } from '../models/clienteRequest.model';
import { ResposnseApiCliente } from '../models/responseClienteApi.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllClientes() : Observable<ResposnseApiCliente[]> {

    return this.http.get<ResposnseApiCliente[]>(this.baseUrl+"/clientes");
  }

  public createCliente(request : ClienteRequest) : Observable<ResposnseApiCliente> {
    return this.http.post<ResposnseApiCliente>(this.baseUrl+"/clientes", request);
  }

  public deleteCliente(id: number) : Observable<any> {
    return this.http.delete<any>(this.baseUrl+"/clientes");
  }

  public getCliente(id: number) : Observable<any> {
    return this.http.get<any>(this.baseUrl+"/clientes/"+id);
  }

  public updateCliente(request: Cliente) : Observable<ResposnseApiCliente> {
    return this.http.put<ResposnseApiCliente>(this.baseUrl+"/clientes", request);
  }
}
