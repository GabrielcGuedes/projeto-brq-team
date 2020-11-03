import { ItemVenda } from './../../shared/models/Item-Venda';
import { StorageService } from './../../shared/services/storage.service';
import { CategoriaService } from './../../adm/adm-service-folder/categoria.service';
import { ProdutoService } from './../../adm/adm-service-folder/produto.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public produtosApi: any = [];
  public produtosApiBackup: any = [];
  public categoriasDaBox: any = [];
  public pagina: number = 0;
  public paginador: number = this.pagina + 1;
  public linhas: number = 3;
  public nome: string = "";
  public totalElementos: number = 0;
  public totalPaginas: number = 0;
  public busca = '';

  constructor(
    private produtosService: ProdutoService,
    private categoriaService: CategoriaService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.getAllProdutos();
    this.getCategorias();
    this.pagination();

  }

  public getCategorias() {
    this.categoriaService.getAllCategorias()
      .subscribe(
        (resultado) => {
          console.log(resultado);
          this.categoriasDaBox = resultado;
        }
      );
  }

  public getAllProdutos() {
    this.produtosService.getAll()
      .subscribe(
        (resultado) => {
          console.log(resultado);
          this.produtosApi = resultado;
          this.produtosApiBackup = resultado;
        }
      );
  }

  public procurarProduto(id: number) {
    let produtos = [];
    this.produtosApiBackup.forEach(element => {
      if (element.categoria.id == id) {
        console.log(element.categoria.id)
        produtos.push(element);
      }
    });
    console.log("Depois " + produtos)
    this.produtosApi = produtos;
    console.log(id)
  }

  private pagination(): void {
    this.produtosService.pagination(this.pagina, this.linhas, this.busca).subscribe(
      (response: any) => {
        console.log(response);
        this.produtosApi = response.content;
        this.totalElementos = response.totalElements;
        this.totalPaginas = response.totalPages;
      }
    );
  }

  public onChangeSelected(): void {
    this.pagination();
  }

  nextPage(): void {
    this.pagina++;
    this.pagination();
  }

  previousPage(): void {
    this.pagina--;
    if (this.pagina < 0) {
      this.pagina = 0;
    }
    this.pagination();
  }

  public setPage(page: number): void {
    this.pagina = page;
    this.pagination();
  }

  pageChange(event) {
    console.log(event);
    this.pagina = event - 1;
    this.paginador = event;
    this.pagination();
  }

  inserirNoCarrinho(produto) {
    let itemVenda : ItemVenda = { produto : produto, quantidade : 1 , id: null };
    let carrinho : ItemVenda[] = this.storageService.getCarrinho();

    if (carrinho == null){
      carrinho = [];
    }
    console.log(carrinho)
    let index = carrinho.findIndex( x => { return x.produto.id == produto.id });
    console.log(index);
    if (index >= 0){
      carrinho[index].quantidade++;
    }
    else {
      carrinho.push(itemVenda);
    }

    this.storageService.setCarrinho(carrinho);
  }

  // public finalizarVenda() {
  //   let venda : VendasModel = {
  //     id:null,
  //     usuario: this.storageService.getLocalUser(),
  //     statusVenda: 'Aberta',
  //     pagamento : '2',
  //     totalItens: this.storageService.getCarrinho().length,
  //     valor : this.storageService.getValorTotal(),
  //     parcela : 1,
  //     valorParcela : this.storageService.getValorTotal(),
  //     item: this.storageService.getCarrinho(),
  //     dataVenda : moment(new Date() ).format("DD-MM-yyyy HH:mm:ss")
  //   };
  // }


}
