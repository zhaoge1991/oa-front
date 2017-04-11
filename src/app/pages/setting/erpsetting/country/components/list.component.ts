import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from "../../../../../services/core/countryService/country.service";
import { Country }  from "../../../../../models/localisation/country";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {GridOptions} from 'ag-grid/main';



@Component({
  selector: 'country-setting-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData:Country[];
  private selectedeRow:boolean;
  public selectedrowData:Country;
  private columnDefs:any[];
  private actionConfig: CommonActionBarConfig;

  //构造函数，初始化
  constructor(
    private router: Router,
    private countryservice: CountryService,
  ){
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.idName = 'country_id';
    this.actionConfig.addNewUrl = 'pages/setting/erpsetting/country/edit';
    this.actionConfig.openUrl = 'pages/setting/erpsetting/country/detail';
    this.actionConfig.editUrl = 'pages/setting/erpsetting/country/edit';
    this.actionConfig.deleteUrl = '65215';
    this.actionConfig.noback = true;
  }

  //函数方法

  //行配置项(获取数据)
  private createRowData() {
    this.rowData =this.countryservice.get();
    console.log(this.rowData);

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
        headerName: 'ISO Code(2)',
        field: 'iso_code_2',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: 'ISO Code(3)',
        field: 'iso_code_3',
        width: 180,
        pinned: true //固定列
      },
    ];
  }

  //选中行数据
  private onRowSelected($event) {
    if ($event.node.selected) {
      this.selectedrowData = $event.node.data as Country;
    }
  }

  //删除操作
  deleteData(e){
    if(e){
      this.countryservice.delete(this.selectedrowData.country_id).subscribe(data=>{
        this.selectedrowData = null;
      })
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/setting/erpsetting/country/detail/',$event.data.country_id])
  }


}
