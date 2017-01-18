import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PaymentService {
  constructor(private http: InterceptorService){}

  private payments;

  getpayments(){
    if (this.payments) {
      return Observable.of(this.payments);
    } else {
      return this.http.get('/api/sale/info/payment').map(
        (response:Response)=> {
          if (response.json()) {
            this.payments = response;
            return response;
          }
        }
      )
    }
  }

}
