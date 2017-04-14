import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";

import {Task} from "../../../../../models/work/task/task";

@Component({
  selector: 'work-tasks-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private selectedeRow: boolean;
  public selectedrowData: Task;

  actionConfig:CommonActionBarConfig;
  constructor(
    private router: Router
  ) {
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.openUrl = 'pages/work/task/tasks/detail';
    this.actionConfig.addNewUrl = 'pages/work/task/tasks/edit';
    this.actionConfig.editUrl = 'pages/work/task/tasks/edit';
    this.actionConfig.idName = 'task_id';
    this.actionConfig.noback = true;
  }


  //选中行列表行配置
  onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = $event.node.data as Task;
      this.selectedeRow = true;
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/work/task/tasks/detail/',$event.data.task_id])
  }

}
