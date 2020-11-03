import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  urlApi = `${environment.urlApi}/produtos`;

  constructor(private httpClient: HttpClient) { }

  getAllProdutosApi(){
    return this.httpClient.get( this.urlApi );
  }

  getOneProduto(id : number){
    return this.httpClient.get(`${this.urlApi}/${id}`);
  }

  public createProduto(produto : any){
    return this.httpClient.post(this.urlApi , produto);
  }

  public updateProduto(id, produto){
    return this.httpClient.patch(`${this.urlApi }/${id}`, produto);
  }

  public deletarProduto(id : any) {
    return this.httpClient.delete (`${this.urlApi }/${id}`);
  }

  // public saveVenda(obj: VendasModel) {
  //   return this.httpClient.post<VendasModel>(`${environment.urlApi}/vendas`, obj)
  // }
}