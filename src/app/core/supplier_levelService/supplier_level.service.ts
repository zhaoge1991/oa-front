import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class SupplierLevelService {
  constructor(private http: InterceptorService){}

  private supplier_levels;

  getsupplier_levels(){
    if (this.supplier_levels) {
      return Observable.of(this.supplier_levels);
    } else {
      return this.http.get('/api/localisation/language').map(
        (response:Response)=> {
          if (response.json()) {
            this.supplier_levels = response;
            return response;
          }
        }
      )
    }
  }

}
