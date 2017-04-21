import {Pipe, PipeTransform} from '@angular/core';
import {OpinionTypeService} from "../../../../services/core/opinion_typeService/opinion_type.service";

@Pipe({
  name: 'opiniontypepipe'
})
export class OpinionTypePipe implements PipeTransform {
  constructor(
    private pipeservice: OpinionTypeService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
