import {Pipe, PipeTransform} from '@angular/core';
import {OrderTypeService} from "../../../../services/core/ordertypeService/order_type.service";

@Pipe({
  name: 'ordertypepipe'
})
export class OrderTypePipe implements PipeTransform {
  constructor(
    private pipeservice: OrderTypeService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
