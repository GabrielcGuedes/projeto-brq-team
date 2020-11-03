import { Categoria } from './categoria';
import { Imagem } from './imagem';

export class Produto {
  id:number;
  nome:string;
  preco:number;
  descricao:string;
  categoria:Categoria[] = [];
  imagens:Imagem[] = [];

}
