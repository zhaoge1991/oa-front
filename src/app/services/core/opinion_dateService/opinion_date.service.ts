import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class OpinionDateService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'OpinionDate','opinion_date_id','getOpinion_dates')
  }

}
