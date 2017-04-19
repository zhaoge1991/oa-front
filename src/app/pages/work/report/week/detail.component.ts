import {Component,OnInit,OnDestroy,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {ReportService} from "../../../../services/work/report/report.service";
import {ReportWeek} from "../../../../models/work/report/reportWeek";


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
    this.commonActionBarConfig.idName = 'report_week_id';
    this.commonActionBarConfig.addNewUrl = 'pages/work/report/week/edit';
    this.commonActionBarConfig.editUrl = 'pages/work/report/week/edit';
    this.commonActionBarConfig.deleteUrl = 'pages/work/report/week/delete';

    this.commonActionBarConfig.comment = true;
  }
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;
  public isSale:boolean;
  name;year;month;day;week;
  tasks;mysourcetasks;lastreport;

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
    this.detailservice.getReportWeekById(id).subscribe(data=>{
      this.data = data.report as ReportWeek;
      this.name = this.data.user.name;
      [this.year,this.month,this.day] = this.data.report_time.split('-');
      this.week = Math.floor(this.day/7)+1;

      this.tasks = data.tasks;  //上周完成事项
      this.mysourcetasks = data.mysourcetasks; //我指派的事项
      this.lastreport = data.lastreport; //上周周报
    })
    this.detailservice.isSaleRoles().subscribe(data=>this.isSale = data);
  }

  postComment(e){
    this.detailservice.postComment(e,this.data.report_week_id,'week').subscribe(()=>this.getById(this.id));
  }

  deleteData(){
    this.detailservice.deleteweek(this.id).subscribe(res=>this.location.back());
  }
}


