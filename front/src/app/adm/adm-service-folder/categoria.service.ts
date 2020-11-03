import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaPagination } from 'src/app/shared/models/categoria-pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  public url = `${environment.urlApi}/categoria`

  constructor(private httpClient : HttpClient) { }

  public getAllCategorias(){
    return this.httpClient.get(`${this.url}`);
  }

  public getById(id :number){
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public save(categoria : any){
    return this.httpClient.post(`${this.url}`, categoria);
  }

  public update(id : number, categoria : any){
    return this.httpClient.patch(`${this.url}/${id}`, categoria);
  }

  public delete(id : number){
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  public pagination(pagina : number, linhas : number, busca : string){
    return this.httpClient.get<CategoriaPagination>(`${this.url}/pagination?pagina=${pagina}&linhas=${linhas}&busca=${busca}`);
  }

}
