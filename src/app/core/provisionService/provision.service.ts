import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import {GetService} from "../../common/function/getfunction";

@Injectable()
export class ProvisionService {
  constructor(private http: InterceptorService,private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'Provision','provision_id','getProvision')
  }

}
