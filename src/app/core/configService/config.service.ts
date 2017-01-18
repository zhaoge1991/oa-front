import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ConfigService {
  constructor(private http: InterceptorService){}

  private configs;

  getconfigs(){
    if (this.configs) {
      return Observable.of(this.configs);
    } else {
      return this.http.get('/api/group/project').map(
        (response:Response)=> {
          if (response.json()) {
            this.configs = response;
            return response;
          }
        }
      )
    }
  }

}
