import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../adm-service-folder/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService:UsuariosService) { }

  public usuarios:any =[];

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  public consultarUsuarios(){
    this.usuarioService.consultarUsuarios().subscribe(
      (response)=>{
        console.log(response);
        this.usuarios = response;
      }
    );
  }

  public deletarUsuario(id){
   this.usuarioService.deletarUsuario(id).subscribe(
    (response)=>{
      this.consultarUsuarios();
    }
   );
  }

}
