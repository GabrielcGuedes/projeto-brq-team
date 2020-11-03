import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagem } from 'src/app/shared/models/imagem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  url = `${environment.urlApi}/imagem`

  constructor(private httpClient : HttpClient) { }


  // getOne(){
  //   return this.httpClient.get(`${this.url}/thumb`);
  // }
   getOne(id:number){
      return this.httpClient.get(`${this.url}/${id}`);
    }
  getAll(){
    return this.httpClient.get(`${this.url}/all`);
  }

  save(imagem : Imagem){
    return this.httpClient.post(this.url, imagem);
  }

  delete(id){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  update(id,body){
    return this.httpClient.patch(`${this.url}/${id}`, body);
  }

  public pagination(pagina: number, linhas: number, busca: string){
    return this.httpClient.get(`${this.url}/paginador?pagina=${pagina}&linhas=${linhas}&busca=${busca}`);
  }




}
