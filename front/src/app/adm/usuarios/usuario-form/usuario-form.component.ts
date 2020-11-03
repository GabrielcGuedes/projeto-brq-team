import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { PerfilPipe } from 'src/app/shared/pipes/perfil.pipe';
import { UsuariosService } from '../../adm-service-folder/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  formUsuarios: FormGroup;
  idUsuario: number = 0;
  isEdicao: boolean = false;
  exibir: boolean = false;
  texto: string = "Cadastrar";
  textoBotao: string = 'Salvar';
  perfis:any[];
  dropdownSettings={};

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private usuariosService: UsuariosService,
    private perfilPipe: PerfilPipe) {
    this.formUsuarios = this.formBuilder.group({
      //valor inicial e os validadores
      id: ['', []],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      perfis: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {

    this.perfis = [
      { codigo: 1, descricao: 'ADMIN' },
      { codigo: 2, descricao: 'CLIENTE'}
    ];

    this.dropdownSettings =  {

      idField:'codigo',
      textField:'descricao',
      selectAllText:'Selecionar todos',
      unSelectAllText:'Limpar seleção',
      allowSearchFilter:false,
      defaultOpen:false,
      showSelectedItemsAtTop:true,
      enableCheckAll:true
    };

    this.activatedRoute
        .params.subscribe(
          (parametros) => {
            if (parametros.id) {
              this.isEdicao = true;
              this.idUsuario = parametros.id;
              this.consultarUsuarioId(this.idUsuario);
              this.textoBotao = 'Editar';
              this.texto = "Alterar";
            }
          }
        )
  }

  onSubmit() {
    this.formUsuarios.value.perfis = this.getPerfis();
    if (this.isEdicao) {
       this.alterarUsuario(this.idUsuario, this.formUsuarios.value);
    }
    else {
      this.cadastrarUsuario(this.formUsuarios.value);
    }
  }

  private getPerfis(){
    let r =[];
    if(this.formUsuarios.value.perfis.length>0){
      this.formUsuarios.value.perfis.forEach(element => {
        r.push(element.codigo);
      });
    }
    return r;
  }

  private getRoules(perfils:number[]){
    let r =[];
    perfils.forEach(element => {
      r.push({codigo:element,descricao:this.perfilPipe.transform([element])});
    });
    return r;
  }

  public consultarUsuarioId(idUsuario:number) {
    this.usuariosService.consultarUsuarioId(idUsuario).subscribe(
      (response:any) => {
        response.perfis=this.getRoules(response.perfis);
        this.formUsuarios.patchValue(response);
      }
    );
  }

  public cadastrarUsuario(body) {
    this.usuariosService.cadastrarUsuario(body).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['adm/usuarios']);
      }
    );
  }

  private alterarUsuario(id,body){
    this.usuariosService.alterarUsuario(id, body)
    .subscribe(
      (dados) =>{
        console.log(dados);
        //this.toastr.success('Usuario Alterado com Sucesso!');
        this.router.navigate(['adm/usuarios']);
        // console.log(JSON.stringify(dados));
      }
    )
  }

  /**documentação */
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  // MÉTODO DO MOSTRAR ERRO
  public isErrorField(fieldName) {
    return (this.formUsuarios.get(fieldName).valid == false && this.formUsuarios.get(fieldName).touched == true);
  }
}
