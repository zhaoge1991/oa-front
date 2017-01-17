import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LocationService {
  constructor(private http: InterceptorService){}
  projects:any;
  getLocation(){
    return this.http.get('/api/sale/table/inquiry')
      .map((response: Response) => {
        console.log(response);
        return response;
      });
  }
}
