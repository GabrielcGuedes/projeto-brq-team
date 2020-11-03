
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from 'src/app/shared/models/produto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  url = `${environment.urlApi}/produto`;

  constructor(private httpClient:HttpClient) {

  }

  public getAll(){
    return this.httpClient.get(this.url);
  }

  public getOne(id:number){
      return this.httpClient.get(`${this.url}/${id}`);
  }

  public update(id:number, dados:Produto){
    return this.httpClient.patch(`${this.url}/${id}`,dados);
  }

  public delete(id:number){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  public save(produto){
    return this.httpClient.post(`${this.url}`, produto);
  }

  public pagination(pagina: number, linhas: number, busca: string){
    return this.httpClient.get(`${this.url}/paginador?pagina=${pagina}&linhas=${linhas}&busca=${busca}`);
  }



}
