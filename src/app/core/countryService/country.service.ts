import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CountryService {
  constructor(private http: InterceptorService){}

  private countries;

  getcountries(): Observable {
    if (this.countries) {
      return Observable.of(this.countries);
    } else {
      return this.http.get('/api/localisation/country').map(
        (response:Response)=> {
          if (response.json()) {
            this.countries = response;
            return response;
          }
        }
      )
    }
  }

}
