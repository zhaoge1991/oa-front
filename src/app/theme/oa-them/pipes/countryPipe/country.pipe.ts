import {Pipe, PipeTransform} from '@angular/core';
import {CountryService} from "../../../../services/coreService/countryService/country.service";

@Pipe({
  name: 'countrypipe'
})
export class CountryPipe implements PipeTransform {
  constructor(
    private pipeservice: CountryService
  ){}
  transform(id:number,property:string='name') {
    let country = this.pipeservice.get(id);
    return country?country[property]:''
  }
}
