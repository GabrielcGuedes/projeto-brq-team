import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuariosService } from '../../adm-service-folder/usuarios.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  public usuario:any;
  public idLocalUser = this.storageService.getLocalUser()?.id;

  constructor(private storageService:StorageService,private usuarioService:UsuariosService) { }

  ngOnInit(): void {
    this.preencherInformacoes();
  }

  public preencherInformacoes(){
    this.usuarioService.consultarUsuarioId(this.idLocalUser).subscribe(
      (response)=>{
        this.usuario = response;
        console.log(response);
      }
    );
  }
}
