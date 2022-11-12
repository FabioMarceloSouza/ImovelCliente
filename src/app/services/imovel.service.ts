import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getImoveis() : Observable<any>{
    return this.http.get(this.baseUrl+"/imoveis");
  }

  public getImovel(id: number) : Observable<any>{
    return this.http.get(this.baseUrl+"/imoveis/"+id);
  }

  public createImovel(request: any) : Observable<any>{
    return this.http.post(this.baseUrl+"/imoveis", request);
  }

  public updateImovel(request: any) : Observable<any>{
    return this.http.put(this.baseUrl+"/imoveis", request);
  }

  public deleteImovel(id: number) : Observable<any>{
    return this.http.delete(this.baseUrl+"/imoveis/"+id);
  }
}
