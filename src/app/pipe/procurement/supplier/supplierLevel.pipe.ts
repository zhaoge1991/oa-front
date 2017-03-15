import {Pipe, PipeTransform} from '@angular/core';
import {SupplierLevelService} from "../../../services/coreService/supplier_levelService/supplier_level.service";

@Pipe({
  name: 'supplierLevelPipe'
})
export class supplierLevelPipe implements PipeTransform {
  constructor(
    private pipeservice: SupplierLevelService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
