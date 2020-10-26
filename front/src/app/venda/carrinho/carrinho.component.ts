import { Component, OnInit } from '@angular/core';
import { ItemVenda } from 'src/app/shared/models/Item-Venda';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public carrinho : any  = [];
  public valorTotal;

  constructor(private storageService : StorageService) { }

  ngOnInit(): void {
    this.getCarrinho();
  }

  getCarrinho(){

    this.carrinho = this.storageService.getCarrinho()
  }

  deletarDoCarrinho(produto){
    let index = this.carrinho.findIndex( x => { return x.produto.id == produto.id });

    this.carrinho.splice(index, 1);

    this.storageService.setCarrinho(this.carrinho);

    this.calculoDoTotal();
  }

//--------------------------------------------------
  atualizarCarrinho(selectedOption, id){
    let num = parseInt(selectedOption)
    //REVISão condição IF após conclusão
    if(num <= 0){
      this.deletarDoCarrinho(id);
    }
//-------------------------------------------------
    let find = this.carrinho.find((item: ItemVenda) => item.produto.id === id)

    if (find) {
      find.quantidade = num
    }

    console.log(this.carrinho)
    console.log(selectedOption)
    console.log(id)
    this.storageService.setCarrinho(this.carrinho);
    this.calculoDoTotal();
  }

  calculoDoTotal(){

    this.valorTotal = this.carrinho.reduce((valorProdutos, item) => valorProdutos + (item.produto.preco * item.quantidade), 0)
  }




}
