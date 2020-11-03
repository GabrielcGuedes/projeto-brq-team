import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.urlApi}/autenticacao`;
  public authSubject = new Subject<Auth>();

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  public autenticacao(login: any) {
    return this.httpClient.post(this.url, login);
  }

  public sendMessage(msg: Auth) {
    this.authSubject.next(msg);
  }

  public isAdmin() {
    let user = this.storageService.getLocalUser();
    if (user) {
      return user.perfis.includes("ADMIN");
    }else{
      return false;
    }
  }

}
