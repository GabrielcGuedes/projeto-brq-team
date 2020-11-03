import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfil'
})
export class PerfilPipe implements PipeTransform {

  transform(value: number[], ...args: unknown[]): unknown {
    console.log(value)
    let response = "";
    if(value.length>0){
      value.forEach(element => {
        if (element == 1){
          response += "ADMIN";
        } else if (element == 2) {
          response += "CLIENTE";
        }
        response += " ";
      });
    }
    return response;
  }

}
