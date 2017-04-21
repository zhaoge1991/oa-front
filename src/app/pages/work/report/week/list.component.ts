import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";

import {Task} from "../../../../models/work/task/task";
import {TaskListComponent} from "../../shared/task_list/taskList.component";
import {ReportService} from "../../../../services/work/report/report.service";

@Component({
  selector: 'work-report-week',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  public selectedrowData: Task;
  public isSaleRole: boolean;

  actionConfig:CommonActionBarConfig;
  constructor(
    private router: Router,
    private listservice: ReportService
  ) {
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.openUrl = 'pages/work/report/week/detail';
    this.actionConfig.editUrl = 'pages/work/report/week/edit';
    this.actionConfig.addNewUrl = 'pages/work/report/week/edit';
    this.actionConfig.deleteUrl = 'pages/work/report/week/delete';
    this.actionConfig.idName = 'report_week_id';
    this.actionConfig.noback = true;
    this.listservice.isSaleRoles().subscribe(res=>{
      this.isSaleRole = res;
    })
  }


  //选中行列表行配置
  onRowSelected($event) {
    this.selectedrowData = $event;
  }

  //传递删除按钮动作到列表
  @ViewChild('weeklist') weeklist: TaskListComponent;
  deleteData(e){
    this.weeklist.delete(e);
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/work/report/week/detail/',$event.data.report_week_id])
  }

}
