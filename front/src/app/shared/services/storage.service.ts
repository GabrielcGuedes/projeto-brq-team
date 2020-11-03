import { Injectable } from '@angular/core';
import { ItemVenda } from '../models/Item-Venda';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getLocalUser() : Usuario{
    let user = localStorage.getItem('localUser');
    if(user){
      return JSON.parse(user);
    }else{
      return null;
    }
  }

  public setLocalUser(obj){
    if(obj == null){
      localStorage.removeItem('localUser');
    }else{
      localStorage.setItem('localUser', JSON.stringify(obj));
    }
  }

  //---------------- Carrinho----------------------------\\

  public getCarrinho(): ItemVenda[] {

    let str = localStorage.getItem('carrinho');

    if (str != null) {
      return JSON.parse(str);
    }
    else {
      return null;
    }
  }

  public setCarrinho(obj: ItemVenda[]) {
    if (obj != null) {

      localStorage.setItem('carrinho', JSON.stringify(obj));
    }
    else {

      localStorage.removeItem('carrinho');
    }
  }

}
