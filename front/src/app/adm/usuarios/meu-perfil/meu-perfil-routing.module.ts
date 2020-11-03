import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarPerfilComponent } from './alterar-perfil/alterar-perfil.component';
import { MeuPerfilComponent } from './meu-perfil.component';

const routes: Routes = [
  {path:'',component:MeuPerfilComponent},
  {path:'alterar',component:AlterarPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeuPerfilRoutingModule { }
