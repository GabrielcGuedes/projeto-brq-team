import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastroComponent } from './cadastro.component';


@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    SharedModule
  ]
})
export class CadastroModule { }
