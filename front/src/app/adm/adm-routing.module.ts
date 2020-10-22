import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { UsuariosComponent } from './usuarios/usuario-list/usuarios.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';

const routes: Routes = [
  { path: "usuarios", component: UsuariosComponent },
<<<<<<< HEAD
// <<<<<<< HEAD
// =======

// >>>>>>> 00c56041252ec62375fa5e91a059ca660943bad5
=======
>>>>>>> 229027322c1224dbe7fcdb129738c7f1ad5f2469
  { path: "usuarios/form", component: UsuarioFormComponent },
  { path: 'categoria', component: CategoriaListComponent },
  { path: 'categoria/form', component: CategoriaFormComponent },

  { path: 'produto/form', component: ProdutoFormComponent },
  { path: 'produto/list', component: ProdutoListComponent },


  { path: 'categoria/form/:id', component: CategoriaFormComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
