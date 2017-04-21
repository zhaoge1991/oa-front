import {Component,OnInit,ViewChild,OnChanges,DoCheck} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {AlertService} from "../../../../services/core/alert.component.service";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {Opinion} from "../../../../models/work/information/opinion";
import {OpinionService} from "../../../../services/work/information/information.service";





@Component({
  selector: 'information-opinion-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent implements OnInit,DoCheck{

  private id:number;
  private olddata: any;
  private data: Opinion;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  lastreport;
  source_usersName: string = '';  //所有发布人名字符串
  receive_usersName: string =  ''; //所有接受人名字符串

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private editservice: OpinionService,
    private alertservice: AlertService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'pages/work/information/opinion/save';
    this.commonActionBarConfig.idName = 'opinion_id';
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }
  ngDoCheck(){
    if(this.data){
      if(this.olddata.receive_users!==this.data.receive_users){
        this.receive_usersName = this.getUsersName(this.data.receive_users);
      }
      if(this.olddata.source_users!==this.data.source_users){
        this.source_usersName = this.getUsersName(this.data.source_users);
      }
    }
  }

  setData(){
    if(this.id){
      this.editservice.getOpinion(this.id).subscribe(data=>{
        this.data = new Opinion(data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));
      })
    } else {
      this.data = new Opinion(null);
      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
  }

  //获取用户数组表用户名
  getUsersName(users){
    let usersNames = '';
    if(users){
      if(users&&users.length) {
        for (let i = 0; i < users.length; i++) {
          if (users.length <= 1) {
            usersNames += users[i].name
          } else {
            usersNames += users[i].name + '、'
          }
        }
        return usersNames;
      } else {return usersNames;}
    }
  }

  //保存
  save(){
    if(this.isEdit){
      this.editservice.putOpinion(this.id,this.data).subscribe();
    } else {
      this.editservice.postOpinion(this.data).subscribe();
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


