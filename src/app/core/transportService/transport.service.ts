import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class TransportService {
  constructor(private http: InterceptorService){}

  private transports;

  gettransports(){
    if (this.transports) {
      return Observable.of(this.transports);
    } else {
      return this.http.get('/api/sale/info/transport').map(
        (response:Response)=> {
          if (response.json()) {
            this.transports = response;
            return response;
          }
        }
      )
    }
  }

}
