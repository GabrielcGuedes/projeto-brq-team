import { ItemVenda } from './item-Venda';
import { Usuario } from './usuario';

export class Vendas{
    id:number;
    usuario: Usuario;
    statusVenda : string;
    pagamento : string;
    totalItens: number;
    valor : number;
    parcela : number;
    valorParcela : number;
    item: ItemVenda[];
    dataVenda : string;
    formaPagamento:string;
}
