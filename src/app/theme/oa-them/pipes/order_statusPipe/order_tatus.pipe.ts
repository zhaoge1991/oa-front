import {Pipe, PipeTransform} from '@angular/core';
import {StatusService} from "../../../../services/coreService/statusService/status.service";


@Pipe({
  name: 'orderstatuspipe'
})
export class OrderStatusPipe implements PipeTransform {
  constructor(
    private pipeservice: StatusService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
