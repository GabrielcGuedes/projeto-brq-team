
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/shared/models/auth';
import { Usuario } from 'src/app/shared/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';

import { StorageService } from 'src/app/shared/services/storage.service';
import { UsuariosService } from '../../adm-service-folder/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin : FormGroup;


  constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService, activatedRoute : ActivatedRoute, private router: Router, private toastr: ToastrService, private storage:StorageService,private authService:AuthService) {
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required]],
      senha:['',[Validators.required]]
    })

   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.usuarioService.logar(this.formLogin.value).subscribe(
      (response:any) =>{
        console.log(response);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.token);

        let localUser : Usuario = {
          token : response.token,
          nome: decodedToken.nome,
          email : decodedToken.sub,
          id : decodedToken.id,
          perfis:decodedToken.scopes
        };
        this.storage.setLocalUser(localUser);
        this.authService.sendMessage({isAdmin:this.authService.isAdmin(),isAuthenticated:true,nome:this.storage.getLocalUser().nome});
        //this.toastr.success("Login feito com sucesso")
        this.router.navigate(['/']);

      }, (error) => {
        console.log(error.status);
        //this.toastr.warning("Erro ao fazer login");
      }
    );

  }

  isErrorField(fieldname) {
    return (this.formLogin.get(fieldname).valid == false && this.formLogin.get(fieldname).touched == true);

  }
}
