import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class StatusService {
  constructor(private http: InterceptorService){}

  private status;

  getstatus(){
    if (this.status) {
      return Observable.of(this.status);
    } else {
      return this.http.get('/api/sale/order/status').map(
        (response:Response)=> {
          if (response.json()) {
            this.status = response;
            return response;
          }
        }
      )
    }
  }

}
