import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/shared/models/categoria';
import { CategoriaService } from '../../adm-service-folder/categoria.service';
import { ProdutoService } from '../../adm-service-folder/produto.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  public produtoForm : FormGroup;
  public idProduto : number =0;
  public isEdicao : boolean =false;
  public textoBotao : string = 'Salvar';

  public categorias : Categoria[] = [];

  constructor(

    private formBuilder : FormBuilder,
    private produtoService : ProdutoService,
    private categoriaService : CategoriaService,
    private activedRoute : ActivatedRoute,
    private router : Router

  ) {

    this.produtoForm = this.formBuilder.group({
      id: ['', []],
      nome : ['', [Validators.required]],
      descricao : ['', [Validators.required]],
      preco : ['', [Validators.required]],
      categoria :  this.formBuilder.group (
        {
          id : ['', [ ] ] ,
          nome : [ '', [ ] ]
        } ),
      imagens: ['',[]]
      })
   }

   ngOnInit(): void {

    this.categoriaService.getAllCategorias()
      .subscribe(
        (dados : any) => {
          this.categorias = dados;
        }
      );

    this.activedRoute.params
      .subscribe((parametros)=>{

        if(parametros.id){
          this.isEdicao =true;
          this.idProduto =parametros.id;
          this.textoBotao ='Editar';
          this.getOne(parametros.id);
        }

    });

  }

  EnviarProduto(){

    this.produtoForm.value.categoria = this.categorias.find(c => c.id == this.produtoForm.get('categoria.id').value);

    if(this.isEdicao){
      this.update(this.idProduto, this.produtoForm.value);
    }
    else{
      this.save(this.produtoForm.value);
    }

  }

  private getOne(id){
     this.produtoService.getOne(id).subscribe(
       (dados)=>{
         this.produtoForm.patchValue(dados)
        }
      )
  }

  private update(id,produto){
    this.produtoService.update(id,produto)
      .subscribe(
        (dados)=>{
          this.router.navigate(['/adm/produto/list']);
        }
      );
  }

  private save(produto){
    console.log(produto);
    this.produtoService.save(produto)
      .subscribe(
        (resultado)=>{
          this.router.navigate(['/adm/produto/list']);
        }
      );
  }

  public isErrorField(fieldName) {
    return (this.produtoForm.get(fieldName).valid == false && this.produtoForm.get(fieldName).touched == true);
  }


}
