import { Injectable }    from '@angular/core';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class TestService{
  constructor (private http: InterceptorService) {}
  login(username: string, password: string){
    return this.http.get('/api/localisation/config')
      .map((response: Response) => {
        console.log(response);
      });
  }
}
