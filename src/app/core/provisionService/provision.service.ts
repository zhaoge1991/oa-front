import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ProvisionService {
  constructor(private http: InterceptorService){}

  private provisions;

  getprovisions(): Observable {
    if (this.provisions) {
      return Observable.of(this.provisions);
    } else {
      return this.http.get('/api/sale/info/provision').map(
        (response:Response)=> {
          if (response.json()) {
            this.provisions = response;
            return response;
          }
        }
      )
    }
  }

}
