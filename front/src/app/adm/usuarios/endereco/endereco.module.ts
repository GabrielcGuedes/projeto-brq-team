import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnderecoComponent } from './endereco.component';


@NgModule({
  declarations: [EnderecoComponent],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    SharedModule
  ]
})
export class EnderecoModule { }
