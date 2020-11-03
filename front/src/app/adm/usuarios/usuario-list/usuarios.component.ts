import { Component, OnInit } from '@angular/core';
import { UsuarioPagination } from 'src/app/shared/models/usuario-pagination';
import { UsuariosService } from '../../adm-service-folder/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios : UsuarioPagination;
  public pagina: number = 0;
  public paginador: number = this.pagina+1;
  public linhas: number = 2;
  public nome: string = "";
  public totalElementos: number = 0;
  public totalPaginas: number = 0;

  constructor(private usuarioService:UsuariosService) { }

  //public usuarios : any =[];

  ngOnInit(): void {
    //this.consultarUsuarios();
    this.paginationLike();
  }

  // public consultarUsuarios(){
  //   this.usuarioService.consultarUsuarios().subscribe(
  //     (response)=>{
  //       console.log(response);
  //       this.usuarios = response;
  //     }
  //   );
  // }

  public deletarUsuario(id){
   this.usuarioService.deletarUsuario(id).subscribe(
    (response)=>{
      //this.consultarUsuarios();
    }
   );
  }

  private paginationLike(): void {
    this.usuarioService.paginationLike(this.pagina, this.linhas, this.nome).subscribe(
      (response: any) => {
        console.log(response);
        this.usuarios = response;
        this.totalElementos = response.totalElements;
        this.totalPaginas = response.totalPages;
      }
    );
  }

  public onChangeSelected(): void {
    this.paginationLike();
  }

  pageChange(event){
    console.log(event);
    this.pagina = event - 1;
    this.paginador = event;
    this.paginationLike();
  }

  public onKeyUp() {
    this.paginationLike();

  }

}
