import {Component,OnInit,ViewChild,OnChanges,DoCheck} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {AlertService} from "../../../../../services/core/alert.component.service";
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Task} from "../../../../../models/work/task/task";
import {TaskService} from "../../../../../services/work/task/task.service";
import {TaskTypeService} from "../../../../../services/core/task_typeService/task_type.service";
import {TaskLevelService} from "../../../../../services/core/task_levelService/task_level.service";


@Component({
  selector: 'sale-order-edit',
  templateUrl: './edit.html',
  styleUrls: []
})

export class EditComponent implements OnInit,DoCheck{

  private id:number;
  private olddata: any;
  private data: Task;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;
  usersName: string = '';  //所有接受人名字符串
  cc_usersName: string =  ''; //所有抄送用户名字符串
  task_levels;
  task_types;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private taskservice: TaskService,
    private alertservice: AlertService,
    private task_typeservice: TaskTypeService,
    private task_levelservice: TaskLevelService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'pages/customer/customers/edit';
    this.commonActionBarConfig.idName = 'customer_id';
    this.task_levels = this.task_levelservice.get();
    this.task_types = this.task_typeservice.get();
  }

  ngDoCheck(){
    if(this.data){
      if(this.olddata.users!==this.data.users){
        this.usersName = this.getUsersName(this.data.users);
      }
      if(this.olddata.user_ccs!==this.data.user_ccs){
        this.cc_usersName = this.getUsersName(this.data.user_ccs);
      }
    }
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
      this.taskservice.getById(this.id).subscribe(data=>{

        this.data = new Task(data);

        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

      })
    } else {
      this.data = new Task(null);

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
      this.taskservice.put(this.id,this.data).subscribe();
    } else {
      this.taskservice.post(this.data).subscribe();
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


