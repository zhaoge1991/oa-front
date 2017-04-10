import {Pipe, PipeTransform} from '@angular/core';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";

@Pipe({
  name: 'filtergrouppipe'
})
export class FilterGroupPipe implements PipeTransform {
  constructor(private appconfigservice: AppconfigService){}
  transform(data:any[],property:string='name') {
    let filterName:string = '';
    if(data&&data.length){
      for(let i=0;i<data.length;i++){
        if(data[i].language_id == this.appconfigservice.get('localisation.language.default')){
          filterName = data[i][property]
        }
      }
      return filterName;
    } else return '';

  }
}
