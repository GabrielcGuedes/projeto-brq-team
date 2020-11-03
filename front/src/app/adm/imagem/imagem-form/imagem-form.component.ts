import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemService } from '../../adm-service-folder/imagem.service';

@Component({
  selector: 'app-imagem-form',
  templateUrl: './imagem-form.component.html',
  styleUrls: ['./imagem-form.component.css']
})
export class ImagemFormComponent implements OnInit {
  
  public imagemForm : FormGroup;
  public isEdicao : boolean = false;
  public idImagem : any;

  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private imagemService : ImagemService,
    private activedRoute: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.pegarCampos();
    this.verificarEdicao();
  }

  pegarCampos(){
    this.imagemForm = this.formBuilder.group({
      url : ['', [Validators.required]],
      nome :['', [Validators.required]]
      });
  }
  cadastrarImagem(){
    if(this.isEdicao == true){
      this.imagemService.update(this.idImagem,this.imagemForm.value).subscribe( (dados) => {
        console.log(dados);
        this.router.navigate(['/adm/imagem/list']);
      }, (error) => {
        console.log(error);
      });
    }else{
      this.imagemService.save(this.imagemForm.value).subscribe( (dados) => {
        console.log(dados);
        this.router.navigate(['/adm/imagem/list']);

      }, (error) => {
        console.log(error);
      });
    }

  }

  verificarEdicao(){
    this.activedRoute.params
      .subscribe((parametros)=>{

        if(parametros.id){
          this.isEdicao =true;
          this.idImagem = parametros.id;
          this.pegarUmaImagemEPopularNoForm(parametros.id);
        }

    });
  }

  private pegarUmaImagemEPopularNoForm(id){
     this.imagemService.getOne(id).subscribe(
       (dados)=>{
         this.imagemForm.patchValue(dados)
        }
      )
 }
}
