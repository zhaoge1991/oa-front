import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timelapsepipe'
})
export class TimeLapsePipe implements PipeTransform {
  constructor(){}
  transform(date:string) {
    let starttime = new Date(Date.parse(date.replace(/-/g,"/"))).getTime();
    let endtime = new Date().getTime();
    let totalSecs = (endtime - starttime)/1000; //相差时间秒数
    if(totalSecs<0) return '0秒';
    let days:number =Math.floor(totalSecs/3600/24);
    let hours:number =Math.floor((totalSecs-days*24*3600)/3600);
    let mins:number =Math.floor((totalSecs-days*24*3600-hours*3600)/60);
    let secs:number =Math.floor((totalSecs-days*24*3600-hours*3600-mins*60));
    if(days>=30) return '一月';
    if(days<30 && days>0) return `${days}天`;
    if((days==0) && (hours>0)) return `${hours}小时`;
    if((hours==0) &&( mins>0)) return `${mins}分钟`;
    if((mins==0) && (secs>0)) return `${secs}秒`;
  }
}
