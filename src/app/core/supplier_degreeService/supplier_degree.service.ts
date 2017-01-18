import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class SupplierDegreeService {
  constructor(private http: InterceptorService){}

  private supplier_degrees;

  getsupplier_degrees(){
    if (this.supplier_degrees) {
      return Observable.of(this.supplier_degrees);
    } else {
      return this.http.get('/api/procurement/supplier_degree').map(
        (response:Response)=> {
          if (response.json()) {
            this.supplier_degrees = response;
            return response;
          }
        }
      )
    }
  }

}
