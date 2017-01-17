import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class DemanderService {
  constructor(private http: InterceptorService){}

  private demanders;

  getdemander(): Observable {
    if (this.demanders) {
      return Observable.of(this.demanders);
    } else {
      return this.http.get('/api/procurement/demander').map(
        (response:Response)=> {
          if (response.json()) {
            this.demanders = response;
            return response;
          }
        }
      )
    }
  }

}
