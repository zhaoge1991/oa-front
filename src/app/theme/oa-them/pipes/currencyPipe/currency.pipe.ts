import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyService} from "../../../../services/coreService/currencyService/currency.service";

@Pipe({
  name: 'currencypipe'
})
export class CurrencyPipe implements PipeTransform {
  constructor(
    private pipeservice: CurrencyService
  ){}
  transform(id:number,property:string='code') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
