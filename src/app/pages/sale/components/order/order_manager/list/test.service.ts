import { Injectable }    from '@angular/core';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class TestService{
  constructor (private http: InterceptorService) {}
  getOrder(){
    return this.http.get('/api/sale/table/inquiry')
      .map((response: Response) => {
        return response.json()
      });
  }
}
