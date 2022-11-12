import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getCep(cep: string):Observable<any> {
    return this.http.get(this.baseUrl+`/cep/${cep}`);
  }
}
