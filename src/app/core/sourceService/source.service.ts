import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class SourceService {
  constructor(private http: InterceptorService){}

  private sources;

  getsources(){
    if (this.sources) {
      return Observable.of(this.sources);
    } else {
      return this.http.get('/api/sale/order/source').map(
        (response:Response)=> {
          if (response.json()) {
            this.sources = response;
            return response;
          }
        }
      )
    }
  }

}
