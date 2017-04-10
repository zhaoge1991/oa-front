import {Pipe, PipeTransform} from '@angular/core';
import {LanguageService} from "../../../../services/core/languageService/language.service";

@Pipe({
  name: 'languagepipe'
})
export class LanguagePipe implements PipeTransform {
  constructor(
    private pipeservice: LanguageService
  ){}
  transform(id:number,property:string='name') {
    let language = this.pipeservice.get(id);
    return language?language[property]:''
  }
}
