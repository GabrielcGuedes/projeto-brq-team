import { Component, OnInit } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { CategoriaPagination } from 'src/app/shared/models/categoria-pagination';
import { CategoriaService } from '../../adm-service-folder/categoria.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  public paginacao : CategoriaPagination;
  //public categoria : Categoria[] = [];
  public paginas: number = 0;
  public linhas : number = 5;
  public totalElementos = 0;
  public totalPages = 0;
  public nome = "";
  constructor(private categoriaService : CategoriaService, private toastr : ToastrService) { }

  ngOnInit(): void {
   this.pagination();
  }



  public deletarCategoria(id : any){
    this.categoriaService.delete(id)
    .subscribe(
      (response) => {
        console.log(response);
        alert("categoria deletada com sucesso!");
        this.pagination();
        this.toastr.success("categoria deletada com sucesso!")
      }
    )
  }
  private pagination(){
    this.categoriaService.pagination(this.paginas, this.linhas, this.nome)
    .subscribe(
      (response : any) => {
        this.paginacao = response;
        this.totalElementos = response.totalElements;
        this.totalPages = response.totalPages;
      }
    );

  }

  public nextPage(){
    this.paginas++;
    this.pagination();
  }

  public previousPage(){
    this.paginas--;
    if(this.paginas < 0) this.paginas = 0;
    this.pagination();
  }

  public setPage(page: number){
    this.paginas = page;
    this.pagination();
  }
  public onLinhasChange(){
    this.pagination();
  }


}
