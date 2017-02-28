import {Pipe, PipeTransform} from '@angular/core';
import {TransportService} from "../../../core/transportService/transport.service";

@Pipe({
  name: 'transportpipe'
})
export class TransportPipe implements PipeTransform {
  constructor(
    private pipeservice: TransportService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
