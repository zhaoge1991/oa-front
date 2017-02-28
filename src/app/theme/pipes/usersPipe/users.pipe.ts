import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userspipe'
})
export class UsersPipe implements PipeTransform {
  transform(data:any[],property:string='name') {
    let users:string = '';
    if(data.length){
      for(let i=0;i<data.length;i++){
        if(data.length<=1){
          users += data[i][property]
        } else {
          users += data[i][property]+'、'
        }
      }
      return users;
    } else return '';

  }
}
