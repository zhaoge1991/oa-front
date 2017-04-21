import {Component,ViewChild,OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {Paginate} from "../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";

import {OpinionService} from "../../../../services/work/information/information.service";
import {OpinionTypeService} from "../../../../services/core/opinion_typeService/opinion_type.service";
import {OpinionDateService} from "../../../../services/core/opinion_dateService/opinion_date.service";
import {Opinion} from "../../../../models/work/information/opinion";
import {CurentUserService} from "../../../../services/core/currentuser.service";

@Component({
  selector: 'information-opinion-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent implements OnInit{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: Opinion[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedrowData: Opinion;
  //翻页配置
  private paginate : Paginate;
  actionConfig:CommonActionBarConfig = new CommonActionBarConfig();

  constructor(
    private router: Router,
    private listservice: OpinionService,
    private opiniontypeservice: OpinionTypeService,
    private opiniondateservice: OpinionDateService,
    private currentuserservice: CurentUserService
  ) {
    //按钮组配置
    this.actionDefault();
  }

  ngOnInit(){
    this.gridOptions = <GridOptions>{};
    this.createRowData(1);
    this.createColumnDefs();
    this.showGrid = true;
  }

  actionDefault(){
    this.actionConfig.openUrl = 'pages/work/information/opinion/detail';
    this.actionConfig.editUrl = 'pages/work/information/opinion/edit';
    this.actionConfig.addNewUrl = 'pages/work/information/opinion/edit';
    this.actionConfig.deleteUrl = 'pages/work/information/opinion/delete';
    this.actionConfig.idName = 'opinion_id';
    this.actionConfig.noback = true;
  }

  pageClick($event){
    this.createRowData($event.text-0);
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  //行配置项(获取数据)
  private createRowData(page) {
    this.listservice.getOpinionList(page)
      .subscribe(data=>{
        this.paginate = data;
        this.rowData = this.paginate.data;
        this.gridOptions.api.sizeColumnsToFit();
        this.actionDefault();
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
        headerName: '需求类型',
        field: 'opinion_type_id',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.opiniontypeservice.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '需求名称',
        field: 'name',
        width: 210,
      },
      {
        headerName: '发起人',
        field: 'source_users',
        width: 100,
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
        }
      },
      {
        headerName: '接受人',
        field: 'receive_users',
        width: 150,
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
        headerName: '发布时间',
        field: 'created_at',
        width: 120,
      },
      {
        headerName: '希望完成时间',
        field: 'opinion_date_id',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.opiniondateservice.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      }
    ];
  }

  //选中行列表行配置
  onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = $event.node.data as Opinion;
      this.selectedeRow = true;
      this.actionChange(this.selectedrowData);
    }
  }

  //选中数据操作按钮变化
  actionChange(data:Opinion){
    let source_users = data.source_users;
    this.currentuserservice.getuser().subscribe(data=>{
      let user = data;
      //发起人中没有当前用户，则删除和编辑需求不可用
      let  purview = source_users.some(e=>{
        if(e.id == user.id) return true;
      });
      if(!purview){
        this.actionConfig.deleteUrl = '';
        this.actionConfig.editUrl = '';
      }
    })
  }

  deleteData(e){
    if(e){
      this.listservice.deleteOpinion(this.selectedrowData.opinion_id).subscribe(data=>{
        this.selectedrowData = null;
        this.createRowData(this.paginate.current_page);
      })
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/work/information/opinion/detail/',$event.data.opinion_id])
  }

}
