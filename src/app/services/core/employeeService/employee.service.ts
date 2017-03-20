import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class EmployeeService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'Employee','employee_id','getCurrency')
  }

}
