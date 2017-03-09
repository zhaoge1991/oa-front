import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class MonthRankingService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'MonthRanking','report_month_ranking_id','getMonth_rankings')
  }

}
