import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {Paginate} from "../../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";

import {TaskService} from "../../../../../services/work/task/task.service";
import {Task} from "../../../../../models/work/task/task";
import {TaskLevelService} from "../../../../../services/core/task_levelService/task_level.service";
import {TaskTypeService} from "../../../../../services/core/task_typeService/task_type.service";


@Component({
  selector: 'work-tasks-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: Task[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedrowData: Task;
  //翻页配置
  private paginate : Paginate;
  private selectedIndex:number;


  pageClick($event){
    this.createRowData($event.text-0);
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  actionConfig:CommonActionBarConfig;
  constructor(
    private router: Router,
    private listservice: TaskService,
    private level: TaskLevelService,
    private tasktype: TaskTypeService
  ) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData(1);
    this.createColumnDefs();
    this.showGrid = true;
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.openUrl = 'pages/work/task/tasks/detail';
    this.actionConfig.addNewUrl = 'pages/work/task/tasks/edit';
    this.actionConfig.idName = 'task_id';
    this.actionConfig.noback = true;
  }

  //行配置项(获取数据)
  private createRowData(page) {
    this.listservice.getMySourceTasks(page)
      .subscribe(data=>{
        this.paginate = data;
        this.rowData = this.paginate.data;
        this.gridOptions.api.sizeColumnsToFit();
    })
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ',field:' ',width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true
      },
      {
        headerName: "#", width: 30,suppressSorting: true,
        suppressMenu: true, pinned: true,
        cellRenderer: function (params) {
          return params.rowIndex+1
        }
      },
      {
        headerName: '任务级别',
        field: 'task_level_id',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.level.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '任务类型',
        field: 'task_type_id',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.tasktype.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '任务名称',
        field: 'name',
        width: 240
      },
      {
        headerName: '发起人',
        field: 'source_user',
        width: 80,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            return data[params.property];
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '接受人',
        field: 'users',
        width: 120,
        editable: false, //是否可双击编辑
        cellRenderer: (params)=>{
          let data = params.value;
          let users:string = '';
          if(data&&data.length){
            for(let i=0;i<data.length;i++){
              if(data.length<=1){
                users += data[i][params.property]
              } else {
                users += data[i][params.property]+'、'
              }
            }
            return users;
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        },
      },
      {
        headerName: '发起时间',
        field: 'date_added',
        width: 120,
      },
      {
        headerName: '截止时间',
        field: 'date_complete',
        width: 120,
      }
    ];
  }

  //选中行列表行配置
  private onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = $event.node.data as Task;
      this.selectedeRow = true;
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/work/task/tasks/detail/',$event.data.task_id])
  }

  //选中订单数据改变
  objectChange(){
    this.selectedrowData = null;
    this.createRowData(this.paginate.current_page);
  }
}
