import {Pipe, PipeTransform} from '@angular/core';
import {LanguageService} from "../../../../services/core/languageService/language.service";

@Pipe({
  name: 'languagepipe'
})
export class LanguagePipe implements PipeTransform {
  constructor(
    private languageservice: LanguageService
  ){}
  transform(id:number,property:string='name') {
    let val = this.languageservice.get(id);
    return val?val[property]:''
  }
}
