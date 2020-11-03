import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../adm-service-folder/usuarios.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  formEndereco: FormGroup;
  public endereco = null;
  public idLocalUser = this.storageService.getLocalUser()?.id;
  public cep: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private enderecoService: UsuariosService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService) { }




  ngOnInit(): void {
    this.createForm();
    this.preencherInformacoes();
    console.log(this.cep);
  }


  private createForm() {
    this.formEndereco = this.formBuilder.group(
      {
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        estado: [""],
        cidade: [""],
        bairro: [""],
        logradouro: [""],
        numero: [""]
      },
    );
  }


  public CadastrarEndereco(body) {
    this.enderecoService.cadastrarEndereco(body).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success("Endereço linkado com sucesso");
        this.router.navigate(['meu-perfil']);


      }, (error) => {
        console.log(error.status);
        alert("Erro ao cadastrar endereço!");
      }
    );

  }

  public cepFalse() {
    this.cep = false;
  }


  public onSubmit() {
    if (this.cep == true) {
      let body = Object.assign(this.formEndereco.value, { usuarioDto: { id: this.idLocalUser } });
      this.CadastrarEndereco(body);
    } else {
      this.toastr.warning("Por favor busque o CEP antes de editar");
    }
  }


  public buscarCEP() {

    this.enderecoService.buscarCEP(this.formEndereco.value.cep).subscribe(
      (response: any) => {
        console.log(response.erro);
        if (response.erro) {
          this.toastr.error("Informe um CEP válido!");
          this.resetarCampos();
        } else {
          this.formEndereco.patchValue({ estado: response.uf, bairro: response.bairro, cidade: response.localidade, logradouro: response.logradouro });
          this.toastr.success("Validação de endereço feita com sucesso!");
          this.cep = true;
        }
      }
    );
  }

  resetarCampos() {
    this.formEndereco.get('logradouro').reset();
    this.formEndereco.get('numero').reset();
    this.formEndereco.get('bairro').reset();
    this.formEndereco.get('cidade').reset();
    this.formEndereco.get('estado').reset();

  }


  public preencherInformacoes() {
    this.enderecoService.consultarUsuarioId(this.idLocalUser).subscribe(
      (response: any) => {
        this.endereco = response?.endereco;
        if (this.endereco) {
          this.formEndereco.patchValue(this.endereco);
        }
        console.log(this.endereco);
      }
    );
  }


  isErrorField(fieldname) {
    return (this.formEndereco.get(fieldname).valid == false && this.formEndereco.get(fieldname).touched == true);
  }
}
