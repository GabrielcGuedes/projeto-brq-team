import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutosPagination } from 'src/app/shared/models/produtos-pagination';
import { ProdutoService } from '../../adm-service-folder/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  public listaDoProduto : ProdutosPagination;

  public pagina         : number = 0;
  public linhas         : number = 5;
  public paginador      : number = this.pagina + 1 ;
  public totalElements  : number = 0;
  public totalPages     : number = 0;

  public busca          : string = "";

  constructor(

    private produtoService : ProdutoService

    ) { }

  ngOnInit(): void {
    this.ListarOsProduto();
  }

  ListarOsProduto(){
    this.produtoService.pagination(this.pagina, this.linhas, this.busca)
      .subscribe( (dadosPego : any) => {
        this.listaDoProduto = dadosPego;
        this.totalElements = dadosPego.totalElements;
        this.totalPages = dadosPego.totalPages;
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

  public onSearch(){
    this.ListarOsProduto();
  }

  public onChangeSelected(): void {
    this.ListarOsProduto();
  }

  pageChange(event : number){
    console.log(event);
    this.pagina = event - 1;
    this.paginador = event;
    this.ListarOsProduto();
  }


}
