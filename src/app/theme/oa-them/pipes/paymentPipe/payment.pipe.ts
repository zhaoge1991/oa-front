import {Pipe, PipeTransform} from '@angular/core';
import {PaymentService} from "../../../../services/coreService/paymentService/payment.service";


@Pipe({
  name: 'paymentpipe'
})
export class PaymentPipe implements PipeTransform {
  constructor(
    private pipeservice: PaymentService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
