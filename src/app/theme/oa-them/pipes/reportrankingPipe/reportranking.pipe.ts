import {Pipe, PipeTransform} from '@angular/core';
import {MonthRankingService} from "../../../../services/core/month_rankingService/month_ranking.service";


@Pipe({
  name: 'reportrankingpipe'
})
export class ReportRankingPipe implements PipeTransform {
  constructor(
    private pipeservice: MonthRankingService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
