import {Component,OnInit,OnDestroy,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {ReportService} from "../../../../services/work/report/report.service";
import {ReportMonth} from "../../../../models/work/report/reportMonth";


@Component({
  selector:'report-week-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private detailservice: ReportService
  ){
    this.commonActionBarConfig.idName = 'report_month_id';
    this.commonActionBarConfig.addNewUrl = 'pages/work/report/month/edit';
    this.commonActionBarConfig.editUrl = 'pages/work/report/month/edit';
    this.commonActionBarConfig.deleteUrl = 'pages/work/report/month/delete';
    this.commonActionBarConfig.reportranking = true;
    this.commonActionBarConfig.comment = true;
  }
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;
  public isSale:boolean;
  name;year;month;day;
  lastreport;

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
    this.detailservice.getReportMonthById(id).subscribe(data=>{
      this.data = data.report as ReportMonth;
      this.name = this.data.user.name;
      [this.year,this.month,this.day] = this.data.report_time.split('-');

      this.lastreport = data.lastreport; //上月月报
    })
    this.detailservice.isSaleRoles().subscribe(data=>this.isSale = data);
  }

  postRanking(e){
    this.detailservice.monthRanking(e,this.data.report_month_id).subscribe(()=>this.getById(this.id));
  }

  deleteData(){
    this.detailservice.deletemonth(this.id).subscribe(res=>this.location.back());
  }
}


