import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  url = `${environment.urlApi}/venda`

  constructor(private httpClient : HttpClient) { }

  public finalizarCompra(body){
    return this.httpClient.post(this.url, body);
  }

}
