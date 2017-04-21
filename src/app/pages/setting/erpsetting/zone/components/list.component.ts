import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {GridOptions} from 'ag-grid/main';
import {ZoneService} from "../../../../../services/core/zoneService/zone.service";
import {Zone} from "../../../../../models/localisation/zone";
import {CountryService} from "../../../../../services/core/countryService/country.service";



@Component({
  selector: 'zone-setting-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData:Zone[];
  private selectedeRow:boolean;
  public selectedrowData:Zone;
  private columnDefs:any[];
  private actionConfig: CommonActionBarConfig;

  //构造函数，初始化
  constructor(
    private router: Router,
    private zoneservice: ZoneService,
    private countryservice: CountryService
  ){
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.idName = 'zone_id';
    this.actionConfig.addNewUrl = 'pages/setting/erpsetting/zone/edit';
    this.actionConfig.openUrl = 'pages/setting/erpsetting/zone/detail';
    this.actionConfig.editUrl = 'pages/setting/erpsetting/zone/edit';
    this.actionConfig.deleteUrl = '65215';
    this.actionConfig.noback = true;
  }

  //函数方法

  //行配置项(获取数据)
  private createRowData() {
    this.zoneservice.getObs().subscribe(data=>{
      this.rowData = data;
    });
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ', field: ' ', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true
      },
      {
        headerName: "#", width: 60, suppressSorting: true,
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
        headerName: '国家',
        field: 'country_id',
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.countryservice.get(data);
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        },
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '地区编码',
        field: 'code',
        width: 180,
        pinned: true //固定列
      },
    ];
  }

  //选中行数据
  private onRowSelected($event) {
    if ($event.node.selected) {
      this.selectedrowData = $event.node.data as Zone;
    }
  }

  //删除操作
  deleteData(e){
    if(e){
      this.zoneservice.delete(this.selectedrowData.zone_id).subscribe(data=>{
        let selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.selectedrowData = null;
      })
    }
  }

  //双击列表单元格操作
  onCellDoubleClicked($event){
    this.router.navigate(['pages/setting/erpsetting/zone/detail/',$event.data.zone_id])
  }


}
