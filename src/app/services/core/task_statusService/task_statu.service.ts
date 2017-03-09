import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class TaskStatusService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'TaskStatus','task_status_id','getTask_statuses')
  }

}
