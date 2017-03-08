import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class CountryService {
  constructor(private http: InterceptorService,private getservice: GetService){}

  get(id?:number){
    return this.getservice.get(id,'Country','country_id','getCountry')
  }

}
