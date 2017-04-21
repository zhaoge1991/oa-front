import {Component,OnInit,ViewChild,OnChanges} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {AlertService} from "../../../../services/core/alert.component.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {ReportWeek} from "../../../../models/work/report/reportWeek";
import {ReportService} from "../../../../services/work/report/report.service";



@Component({
  selector: 'sale-order-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent implements OnInit{

  private id:number;
  private olddata: any;
  private data: ReportWeek;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  public isSale: boolean;
  tasks;
  mysourcetasks;
  lastreport;
  mytask;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private editservice: ReportService,
    private alertservice: AlertService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'pages/work/report/week/save';
    this.commonActionBarConfig.idName = 'report_week_id';
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }

  setData(){
    if(this.id){
      this.editservice.getReportWeekById(this.id).subscribe(data=>{
        this.data = new ReportWeek(data.report);
        this.getLastWeekData(this.data.report_time);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));
      })
    } else {
      this.data = new ReportWeek(null);
      this.getLastWeekData();
      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
    this.editservice.isSaleRoles().subscribe(data=>this.isSale = data);
  }

  //获取上周相关数据
  getLastWeekData(date?){
    this.editservice.getWork(date).subscribe(data=>{
      this.tasks = data.tasks;
      this.mysourcetasks = data.mysourcetasks;
      this.lastreport = data.lastreport;
      this.mytask = data.mytask;
    })
  }

  //保存
  save(){
    if(this.isEdit){
      this.editservice.putweek(this.id,this.data).subscribe();
    } else {
      this.editservice.postweek(this.data).subscribe();
    }
    this.olddata = this.data;
  }

  //编辑守卫
  canDeactivate(): boolean|Observable<boolean>{
    if(JSON.stringify(this.olddata) == JSON.stringify(this.data)){
      return true;
    } else {
      return this.alertservice.putMessage({
        title: '提示弹窗',
        detail: '单据已修改，确认放弃修改并退出吗？',
        severity: 'warn'
      })
    }
  }

}


