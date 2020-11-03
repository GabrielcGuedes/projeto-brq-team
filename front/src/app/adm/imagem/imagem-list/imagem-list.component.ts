import { Component, OnInit } from '@angular/core';
import { ImagemPagination } from 'src/app/shared/models/imagem-pagination';
import { ImagemService } from '../../adm-service-folder/imagem.service';

@Component({
  selector: 'app-imagem-list',
  templateUrl: './imagem-list.component.html',
  styleUrls: ['./imagem-list.component.css']
})
export class ImagemListComponent implements OnInit {

  public imagens : ImagemPagination;

  public pagina             : number = 0;
  public imagensPorPagina   : number = 20;
  public paginador          : number = this.pagina + 1 ;
  public totalElements      : number = 0;
  public totalPages         : number = 0;
  public busca              : string = "";

  constructor(

    private imagemService : ImagemService

    ) { }

  ngOnInit(): void {
    this.getImagens();

  }

  getAll(){
    this.imagemService.getAll().subscribe(
      (dados : any) =>{
        this.imagens = dados;
      })
  }

  deletarImagem(id){
    this.imagemService.delete(id).subscribe(
      (dados)=> {
        this.getImagens();
      }
    )
  }

  getImagens(){
    this.imagemService.pagination(this.pagina, this.imagensPorPagina, this.busca)
      .subscribe( (dados : any) => {
        this.imagens = dados;
        this.totalElements = dados.totalElements;
        this.totalPages = dados.totalPages;
      }, (error) =>{
        console.log(error);
      });
  }

  public onSearch(){
    this.getImagens();
  }

  pageChange(event : number){
    console.log(event);
    this.pagina = event - 1;
    this.paginador = event;
    this.getImagens();
  }




}
