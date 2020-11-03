import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/adm/adm-service-folder/usuarios.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-alterar-perfil',
  templateUrl: './alterar-perfil.component.html',
  styleUrls: ['./alterar-perfil.component.css']
})
export class AlterarPerfilComponent implements OnInit {

  formUsuarios: FormGroup;
  public idLocalUser = this.storageService.getLocalUser()?.id;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService, private usuariosService: UsuariosService,private storageService: StorageService) {
    this.formUsuarios = this.formBuilder.group({
      //valor inicial e os validadores
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.consultarUsuarioId(this.idLocalUser);
  }

  onSubmit() {
       this.alterarUsuario(this.idLocalUser, this.formUsuarios.value);
  }


  public consultarUsuarioId(idUsuario) {
    this.usuariosService.consultarUsuarioId(idUsuario).subscribe(
      (response) => {
        this.formUsuarios.patchValue(response);
      }
    );
  }

  private alterarUsuario(id,body){
    this.usuariosService.alterarUsuario(id, body)
    .subscribe(
      (dados) =>{
        console.log(dados);
        this.toastr.success('Informações alteradas com sucesso!');
        this.router.navigate(['meu-perfil']);
        // console.log(JSON.stringify(dados));
      }
    )
  }

  // MÉTODO DO MOSTRAR ERRO
  public isErrorField(fieldName) {
    return (this.formUsuarios.get(fieldName).valid == false && this.formUsuarios.get(fieldName).touched == true);
  }

}
