import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../adm-service-folder/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  meuForm : FormGroup;
  isEdicao : boolean = false;
  textoBotao : string = 'Salvar';
  idCategoria : number = 0;


  constructor(
    private formBuilder : FormBuilder,
    private categoriaService : CategoriaService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private toastr : ToastrService
    ) {  this.meuForm = this.formBuilder.group( {
      id : [null, []],
      nome : [null , [Validators.required]],
      descricao : [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe(
        (parametros) => {
          if (parametros.id){
            this.isEdicao = true;
            this.idCategoria = parametros.id;
            this.getOneCategoria(parametros.id);
          }
        }
      );

  }

  onSubmit(){
    console.log(this.meuForm);
    if (this.isEdicao){
      this.updateCategoria(this.idCategoria, this.meuForm.value);
    }
    else{
      this.createCategoria( this.meuForm.value);
    }
  }

  private createCategoria(categoria){
    this.categoriaService.save(categoria)
      .subscribe(
        (dados) => {
          console.log( dados );
          this.toastr.success('Categoria salva com sucesso!');
          this.router.navigate(['adm/categoria']);
        }
      )
  }

  private updateCategoria(id, categoria){
    this.categoriaService.update(id,categoria)
    .subscribe(
      (dados) => {
        console.log(dados);
        this.toastr.success('aluno alterado com sucesso!');
        this.router.navigate(['adm/categoria']);
        this.textoBotao = "Editar";
      }
    )
  }

  private getOneCategoria(id){
    this.categoriaService.getById(id)
      .subscribe(
        (dados) => {
          console.log(dados);
          this.meuForm.patchValue(dados);
        }
      );
  }

  public isErrorField(fieldName) {
    return (this.meuForm.get( fieldName ).valid == false && this.meuForm.get( fieldName ).touched == true);
  }

  public receberNotificacao(event){
    console.log (event);
  }

}
