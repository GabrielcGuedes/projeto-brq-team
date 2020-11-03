import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsService } from './adm/guards/guards.service';
import { HomeComponent } from './venda/home/home.component';

const routes : Routes = [
  {path:'',component:HomeComponent},
  {path : 'adm', loadChildren : ()=> import('./adm/adm.module').then(m=> m.AdmModule ), canActivate:[GuardsService]},
  {path : 'login', loadChildren : ()=> import('./adm/usuarios/login/login.module').then(m=> m.LoginModule )},
  {path : 'cadastro', loadChildren : ()=> import('./adm/usuarios/cadastro/cadastro.module').then(m=> m.CadastroModule)},
  {path : 'venda', loadChildren : ()=> import('./venda/vendas.module').then(m=> m.VendasModule)},
  {path : 'endereco', loadChildren : ()=> import('./adm/usuarios/endereco/endereco.module').then(m=> m.EnderecoModule)},
  {path : 'meu-perfil', loadChildren : ()=> import('./adm/usuarios/meu-perfil/meu-perfil.module').then(m=> m.MeuPerfilModule)}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
