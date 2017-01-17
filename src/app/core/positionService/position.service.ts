import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PositionService {
  constructor(private http: InterceptorService){}

  private positions;

  getpositions(): Observable {
    if (this.positions) {
      return Observable.of(this.positions);
    } else {
      return this.http.get('/api/organization/position').map(
        (response:Response)=> {
          if (response.json()) {
            this.positions = response;
            return response;
          }
        }
      )
    }
  }

}
