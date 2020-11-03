import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { UsuariosComponent } from './usuarios/usuario-list/usuarios.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';
import { LoginComponent } from './usuarios/login/login.component';
import { ImagemListComponent } from './imagem/imagem-list/imagem-list.component';
import { ImagemFormComponent } from './imagem/imagem-form/imagem-form.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: "usuarios/form", component: UsuarioFormComponent },
  { path: "login", component: LoginComponent },
  { path: 'categoria', component: CategoriaListComponent },
  { path: 'categoria/form', component: CategoriaFormComponent },
  { path: 'imagem', component : ImagemListComponent},
  { path: 'imagem/list', component : ImagemListComponent},
  { path: 'produto',component: ProdutoListComponent},
  { path: 'produto/list', component: ProdutoListComponent },
  { path: 'produto/form', component: ProdutoFormComponent },
 

  { path : 'imagem/form', component : ImagemFormComponent},
  { path : 'imagem/form/:id', component : ImagemFormComponent},

  { path: 'categoria/form/:id', component: CategoriaFormComponent },
  { path: 'produto/form/:id', component: ProdutoFormComponent },
  { path: "usuarios/form/:id", component: UsuarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
