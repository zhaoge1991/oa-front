import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class LanguageService {
  constructor(private http: InterceptorService){}

  private languages;

  getlanguages(){
    if (this.languages) {
      return Observable.of(this.languages);
    } else {
      return this.http.get('/api/localisation/language').map(
        (response:Response)=> {
          if (response.json()) {
            this.languages = response;
            return response;
          }
        }
      )
    }
  }

}
