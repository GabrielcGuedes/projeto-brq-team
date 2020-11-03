import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsuarioPagination } from 'src/app/shared/models/usuario-pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = `${environment.urlApi}/usuarios`;
  urlEndereco = `${environment.urlApi}/enderecos`;
  urlAutenticacao = `${environment.urlApi}/autenticacao`;

  constructor(private httpClient:HttpClient) { }

  public consultarUsuarios(){
    return this.httpClient.get(this.url);
  }

  public consultarUsuarioId(id:Number){
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public cadastrarUsuario(body){
    return this.httpClient.post(this.url,body);
  }

  public alterarUsuario(id:Number,body:any){
    return this.httpClient.patch(`${this.url}/${id}`,body);
  }

  public deletarUsuario(id:number){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  //LOGIN
  public logar(body:any){
    return this.httpClient.post(this.urlAutenticacao,body);
  }

  //Paginação
  public paginationLike(pagina: number, linhas: number, nome: string){
    return this.httpClient.get<UsuarioPagination>(`${this.url}/paginadorLike?pagina=${pagina}&linhas=${linhas}&nome=${nome}`);
  }

  //endereco
  public cadastrarEndereco(body){
    return this.httpClient.post(this.urlEndereco,body);
  }
  //Service buscar CEP
  public buscarCEP(cep){
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
  }


}
