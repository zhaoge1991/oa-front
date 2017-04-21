import {Pipe, PipeTransform} from '@angular/core';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";

@Pipe({
  name: 'descriptionpipe'
})
export class DescriptionPipe implements PipeTransform {
  languageId: number;
  constructor(private appconfigservice: AppconfigService){
    this.languageId = this.appconfigservice.get('localisation.language.default');
  }

  transform(data:any[],property:string='name') {
    let description:any = '';
    if(data&&data.length){
      for(let i=0;i<data.length;i++){
        if(data[i].language_id == this.languageId){
          description = data[i][property]
        }
      }
      return description;
    } else return '';

  }
}
