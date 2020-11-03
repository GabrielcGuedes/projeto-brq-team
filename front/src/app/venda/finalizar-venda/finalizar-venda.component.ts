import { Component, OnInit } from '@angular/core';
import { ItemVenda } from 'src/app/shared/models/Item-Venda';
import { StorageService } from 'src/app/shared/services/storage.service';
import { VendaService } from '../Venda-Services/venda.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/adm/adm-service-folder/usuarios.service';
import { isThisTypeNode } from 'typescript';
import { Vendas } from 'src/app/shared/models/vendas';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-venda',
  templateUrl: './finalizar-venda.component.html',
  styleUrls: ['./finalizar-venda.component.css']
})
export class FinalizarVendaComponent implements OnInit {

  public carrinho: any = [];
  public valorTotal;
  public quant: any;
  public formaPagamento: any;
  public formEndereco: FormGroup;
  public formPagamento: FormGroup;
  public isCartao: boolean = false;
  public varPagamento: any = "";
  public desativarCompra: boolean = true;
  public valParcelas: any = 1;


  public idLocalUser = this.storageService.getLocalUser()?.id;
  public endereco = null;

  constructor(private storageService: StorageService,
    private vendaService: VendaService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,private toastr:ToastrService,private router:Router) {

    this.formEndereco = this.formBuilder.group(
      {
        logradouro: [''],
        numero: [''],
        cidade: [''],
        estado: [''],
        cep: ['']
      }
    );

    this.formPagamento = this.formBuilder.group(
      {
        metodo: [''],
        parcela: ['']
      }
    );



  }

  ngOnInit(): void {

    console.log(this.storageService.getCarrinho());
    this.getCarrinho();
    this.calculoDoTotal();
    this.somarQuantProdutos();
    this.preencherInformacoes();
  }

  getCarrinho() {
    this.carrinho = this.storageService.getCarrinho();
  }


  calculoDoTotal() {

    this.valorTotal = this.carrinho.reduce((valorProdutos, item) => valorProdutos + (item.produto.preco * item.quantidade), 0)
  }

  public somarQuantProdutos() {
    let quantTotalArray = 0;
    this.carrinho.forEach(function (response) {
      quantTotalArray += response?.quantidade;
    });
    this.quant = quantTotalArray;
  }

  public preencherInformacoes() {
    this.usuariosService.consultarUsuarioId(this.idLocalUser).subscribe(
      (response: any) => {
        this.endereco = response?.endereco;
        if (this.endereco) {
          this.formEndereco.patchValue(this.endereco);
        }
        console.log(this.endereco);
      }
    );
  }

  formaPag() {
    if (this.formPagamento.value.metodo == "cartao") {
      this.isCartao = true;
    } else {
      this.isCartao = false;
    }
    this.verificarCampos();
  }

  verificarCampos() {
    if (this.valParcelas == "") {
      this.desativarCompra = true;
    } else if (this.formPagamento.value.metodo == "boleto") {
      this.valParcelas = 1;
      this.desativarCompra = false;
    } else if (this.formPagamento.value.metodo == "cartao") {
      this.desativarCompra = false;
    } else {
      this.desativarCompra = true;
    }



  }

  onSubmit() {
    this.finalizarCompra();
  }

  //------------------------------------------
  // Finalização da compra

  finalizarCompra() {
    let venda: Vendas = {
      id: null,
      usuario: this.storageService.getLocalUser(),
      statusVenda: 'Aberta',
      pagamento: '2',
      totalItens: this.storageService.getCarrinho().length,
      valor: this.valorTotal,
      parcela: this.formPagamento.value.parcela,
      valorParcela: this.valorTotal / this.formPagamento.value.parcela,
      item: this.carrinho,
      dataVenda: moment(new Date()).format("DD-MM-yyyy HH:mm:ss"),
      formaPagamento:this.formPagamento.value.metodo
    }
    delete venda.usuario.perfis

    this.vendaService.finalizarCompra(venda).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success("Parabéns pela compra!!");
        this.router.navigate(['../../']);
        this.storageService.setCarrinho(null);
      }
    );

  }


}
