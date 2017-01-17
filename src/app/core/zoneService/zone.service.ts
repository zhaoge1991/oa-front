import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ZoneService {
  constructor(private http: InterceptorService){}

  private zones;

  getzones(): Observable {
    if (this.zones) {
      return Observable.of(this.zones);
    } else {
      return this.http.get('/api/localisation/zone').map(
        (response:Response)=> {
          if (response.json()) {
            this.zones = response;
            return response;
          }
        }
      )
    }
  }

}
