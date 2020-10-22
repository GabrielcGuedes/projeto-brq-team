import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../adm-service-folder/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  public listaDoProduto : any = [];
  constructor(private produtoService : ProdutoService) { }

  ngOnInit(): void {
    this.ListarOsProduto();
  }

  ListarOsProduto(){
    this.produtoService.getAll().subscribe( (dadosPego) => {
      console.log(dadosPego);
      this.listaDoProduto = dadosPego;
    }, (error) =>{
      console.log(error);
    });
  }


  excluirProduto(id){
    this.produtoService.delete(id).subscribe(
      (response)=>{
        this.ListarOsProduto();
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
