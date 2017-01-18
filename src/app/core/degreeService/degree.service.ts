import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class DegreeService {
  constructor(private http: InterceptorService){}

  private degrees;

  getdegrees(){
    if (this.degrees) {
      return Observable.of(this.degrees);
    } else {
      return this.http.get('/api/organization/degree').map(
        (response:Response)=> {
          if (response.json()) {
            this.degrees = response;
            return response;
          }
        }
      )
    }
  }

}
