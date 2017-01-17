import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CurrencyService {
  constructor(private http: InterceptorService){}

  private currences;

  getcurrences(): Observable {
    if (this.currences) {
      return Observable.of(this.currences);
    } else {
      return this.http.get('/api/localisation/currency').map(
        (response:Response)=> {
          if (response.json()) {
            this.currences = response;
            return response;
          }
        }
      )
    }
  }

}
