import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/adm/adm-service-folder/categoria.service';
import { Categoria } from 'src/app/shared/models/categoria';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isAdmin = false;
  public paginacao: Categoria;
  public isAuthenticated = false;
  public nomeUsuario:string;

  constructor(
    private categoriasService: CategoriaService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.getAllAlunos();
    this.nomeUsuario = this.storageService.getLocalUser()?.nome;
    this.isAuthenticated = this.storageService.getLocalUser() ? true : false;
    this.isAdmin = this.authService.isAdmin();
    console.log(this.isAdmin);

    this.authService.authSubject.subscribe(
      (message) => {
        this.nomeUsuario = message.nome;
        this.isAuthenticated = message.isAuthenticated;
        this.isAdmin = message.isAdmin;
      }
    );

    if (!this.isAuthenticated) {
      this.storageService.setLocalUser(null);
      this.router.navigate(['']);

    }
  }

  logout() {
    this.storageService.setLocalUser(null);
    this.router.navigate(['']);
    this.isAuthenticated = this.storageService.getLocalUser() ? true : false;
    this.isAdmin = this.authService.isAdmin();
  }
}
