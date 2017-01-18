import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class SupplierStatusService {
  constructor(private http: InterceptorService){}

  private supplier_status;

  getsupplier_status(){
    if (this.supplier_status) {
      return Observable.of(this.supplier_status);
    } else {
      return this.http.get('/api/procurement/supplier_status').map(
        (response:Response)=> {
          if (response.json()) {
            this.supplier_status = response;
            return response;
          }
        }
      )
    }
  }

}
