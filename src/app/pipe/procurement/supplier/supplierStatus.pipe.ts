import {Pipe, PipeTransform} from '@angular/core';
import {SupplierStatusService} from "../../../services/core/supplier_statusServices/supplier_status.service";

@Pipe({
  name: 'supplierStatusPipe'
})
export class supplierStatusPipe implements PipeTransform {
  constructor(
    private pipeservice: SupplierStatusService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
