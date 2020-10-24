import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmRoutingModule } from './adm-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { UsuariosComponent } from './usuarios/usuario-list/usuarios.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ImagemListComponent } from './imagem/imagem-list/imagem-list.component';
import { ImagemFormComponent } from './imagem/imagem-form/imagem-form.component';

@NgModule({
  declarations: [
    CategoriaFormComponent,
    CategoriaListComponent,
    ProdutoFormComponent,
    ProdutoListComponent,
    UsuariosComponent,
    HomeComponent,
    UsuarioFormComponent,
  ], imports: [SharedModule, CommonModule,
    AdmRoutingModule, NgxPaginationModule,RouterModule,  CarouselModule.forRoot()]
})
export class AdmModule { }

