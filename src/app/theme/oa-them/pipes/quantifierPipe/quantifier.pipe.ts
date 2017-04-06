import {Pipe, PipeTransform} from '@angular/core';
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";


@Pipe({
  name: 'quantifierpipe'
})
export class QuantifierPipe implements PipeTransform {
  constructor(
    private pipeservice: QuantifierService
  ){}
  transform(id:number,property:string='code') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
