import { Usuario } from './usuario';

export class UsuarioPagination {
  content: Usuario[] = [];
  totalPages: number = 0;
  totalElements: number = 0;
  size: number = 0;
  number: number;
  numberOfElements: number;
}
