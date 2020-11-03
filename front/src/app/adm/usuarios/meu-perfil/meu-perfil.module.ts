import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeuPerfilRoutingModule } from './meu-perfil-routing.module';
import { MeuPerfilComponent } from './meu-perfil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlterarPerfilComponent } from './alterar-perfil/alterar-perfil.component';


@NgModule({
  declarations: [MeuPerfilComponent, AlterarPerfilComponent],
  imports: [
    CommonModule,
    MeuPerfilRoutingModule,
    SharedModule
  ]
})
export class MeuPerfilModule { }
