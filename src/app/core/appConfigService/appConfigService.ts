import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import {AllConfigService} from "../allConfig.service";

@Injectable()
export class AppconfigService {
  constructor(private http: InterceptorService,private configservice: AllConfigService){}

  get(per?:string){
    //return this.getservice.get(per,'Appconfig','','getAppconfig');
    let session = sessionStorage.getItem('appconfig');
    if(!session) {
      this.configservice.getAppconfig().subscribe(data => {
        sessionStorage.setItem('appconfig',JSON.stringify(data));
        return per?data[per]:data;
      });
    }else {
      let data = JSON.parse(session);
      return per?data[per]:data;
    }
  }

}
