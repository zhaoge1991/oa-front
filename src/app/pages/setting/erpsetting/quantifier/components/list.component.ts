import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {GridOptions} from 'ag-grid/main';
import {Quantifier} from "../../../../../models/localisation/quantifier";
import {QuantifierService} from "../../../../../services/core/quantifierService/quantifier.service";



@Component({
  selector: 'currency-quantifier-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData:Quantifier[];
  private selectedeRow:boolean;
  public selectedrowData:Quantifier;
  private columnDefs:any[];
  private actionConfig: CommonActionBarConfig;

  //构造函数，初始化
  constructor(
    private router: Router,
    private quantifierservice: QuantifierService
  ){
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.idName = 'quantifier_id';
    this.actionConfig.addNewUrl = 'pages/setting/erpsetting/quantifier/edit';
    this.actionConfig.openUrl = 'pages/setting/erpsetting/quantifier/detail';
    this.actionConfig.editUrl = 'pages/setting/erpsetting/quantifier/edit';
    this.actionConfig.deleteUrl = '65215';
    this.actionConfig.noback = true;
  }

  //函数方法

  //行配置项(获取数据)
  private createRowData() {
    this.rowData =this.quantifierservice.get();

  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ', field: ' ', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true
      },
      {
        headerName: "#", width: 30, suppressSorting: true,
        suppressMenu: true, pinned: true,
        cellRenderer: function (params) {
          return params.rowIndex + 1
        }
      },
      {
        headerName: '名称',
        field: 'code',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '描述',
        field: 'description',
        width: 180,
        pinned: true //固定列
      },
    ];
  }

  //选中行数据
  private onRowSelected($event) {
    if ($event.node.selected) {
      this.selectedrowData = $event.node.data as Quantifier;
    }
  }

  //删除操作
  deleteData(e){
    if(e){
      this.quantifierservice.delete(this.selectedrowData.quantifier_id).subscribe(data=>{
        let selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.selectedrowData = null;
      })
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/setting/erpsetting/quantifier/detail/',$event.data.quantifier_id])
  }

}
