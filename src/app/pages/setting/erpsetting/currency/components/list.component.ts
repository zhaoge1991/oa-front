import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Currency }  from "../../../../../models/localisation/currency";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
// import {Paginate} from "../../../../../models/common/paginate";
import {GridOptions} from 'ag-grid/main';
import {CurrencyService} from "../../../../../services/core/currencyService/currency.service";



@Component({
  selector: 'currency-setting-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData:Currency[];
  private selectedeRow:boolean;
  public selectedrowData:Currency;
  private columnDefs:any[];
  private actionConfig: CommonActionBarConfig;

  //构造函数，初始化
  constructor(
    private router: Router,
    private currencyservice: CurrencyService
  ){
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.idName = 'currency_id';
    this.actionConfig.addNewUrl = 'pages/setting/erpsetting/currency/edit';
    this.actionConfig.openUrl = 'pages/setting/erpsetting/currency/detail';
    this.actionConfig.editUrl = 'pages/setting/erpsetting/currency/edit';
    this.actionConfig.deleteUrl = '65215';
    this.actionConfig.noback = true;
  }

  //函数方法

  //行配置项(获取数据)
  private createRowData() {
    this.rowData =this.currencyservice.get();

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
        field: 'name',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '代码',
        field: 'code',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '值',
        field: 'value',
        width: 180,
        pinned: true //固定列
      },
    ];
  }

  //选中行数据
  private onRowSelected($event) {
    if ($event.node.selected) {
      this.selectedrowData = $event.node.data as Currency;
    }
  }

  //删除操作
  deleteData(e){
    if(e){
      this.currencyservice.delete(this.selectedrowData.currency_id).subscribe(data=>{
        let selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.selectedrowData = null;
      })
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/setting/erpsetting/currency/detail/',$event.data.currency_id])
  }

}
