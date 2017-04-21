import {Component,OnInit,ViewChild,OnChanges} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {AlertService} from "../../../../services/core/alert.component.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {ReportService} from "../../../../services/work/report/report.service";
import {ReportMonth} from "../../../../models/work/report/reportMonth";



@Component({
  selector: 'report-month-edit',
  templateUrl: './edit.html',
  styleUrls: []
})

export class EditComponent implements OnInit{

  private id:number;
  private olddata: any;
  private data: ReportMonth;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  lastreport;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private editservice: ReportService,
    private alertservice: AlertService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'pages/work/report/month/save';
    this.commonActionBarConfig.idName = 'report_month_id';
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
      this.editservice.getReportMonthById(this.id).subscribe(data=>{
        this.data = new ReportMonth(data.report);
        this.getLastMonthData(this.data.report_time);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));
      })
    } else {
      this.data = new ReportMonth(null);
      this.getLastMonthData();
      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
  }

  //获取上周相关数据
  getLastMonthData(date?){
    this.editservice.getWorkMonth(date).subscribe(data=>{
      this.lastreport = data.lastreport;
    })
  }

  //保存
  save(){
    if(this.isEdit){
      this.editservice.putmonth(this.id,this.data).subscribe();
    } else {
      this.editservice.postmonth(this.data).subscribe();
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


