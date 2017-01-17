import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class QuantifierService {
  constructor(private http: InterceptorService){}

  private quantifiers;

  getquantifiers(): Observable {
    if (this.quantifiers) {
      return Observable.of(this.quantifiers);
    } else {
      return this.http.get('/api/localisation/quantifier').map(
        (response:Response)=> {
          if (response.json()) {
            this.quantifiers = response;
            return response;
          }
        }
      )
    }
  }

}
