import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemVenda } from 'src/app/shared/models/Item-Venda';
import { Produto } from 'src/app/shared/models/produto';
import { StorageService } from 'src/app/shared/services/storage.service';
import { VendaService } from '../Venda-Services/venda.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public carrinho: any = [];
  public valorTotal;
  public carrinhoNotnull = false;

  constructor(private storageService: StorageService,
    private vendaService: VendaService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getCarrinho();
    this.calculoDoTotal();
  }

  getCarrinho() {

    this.carrinho = this.storageService.getCarrinho();
    this.carrinhoNotnull = this.carrinho && this.carrinho.length>0;
    console.log(this.carrinho);
    console.log(this.carrinhoNotnull);
  }

  deletarDoCarrinho(produto) {
    let index = this.carrinho.findIndex(x => { return x.produto.id == produto.produto.id });
    console.log("Index:  " + index);

    this.carrinho.splice(index, 1);

    this.storageService.setCarrinho(this.carrinho);
    this.calculoDoTotal();
    this.getCarrinho();
  }

  //--------------------------------------------------
  atualizarCarrinho(selectedOption, id) {
    console.log("ID  " + id);
    let num = parseInt(selectedOption);
    //REVISão condição IF após conclusão
    if (num <= 0 ) {
      num = 1;
      this.toastr.warning("Quantidade inválida");
    }
    //-------------------------------------------------
    let find = this.carrinho.find((item: ItemVenda) => item.produto.id === id);

    if (find) {
      find.quantidade = num
    }

    console.log(this.carrinho);
    console.log(selectedOption);
    console.log(id);
    this.storageService.setCarrinho(this.carrinho);
    this.calculoDoTotal();
    this.getCarrinho();
  }

  calculoDoTotal() {

    if (this.carrinho) {
      this.valorTotal = this.carrinho.reduce((valorProdutos, item) => valorProdutos + (item.produto.preco * item.quantidade), 0)
    }
  }

}
