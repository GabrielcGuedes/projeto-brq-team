import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor{

  constructor(private storage: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.storage.getLocalUser()?.token;

    if (req.url.includes('viacep') == false) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        }
      );
    }
    return next.handle(req);
  }
}
