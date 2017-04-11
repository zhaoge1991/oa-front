import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";

import {GridOptions} from 'ag-grid/main';
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";

@Component({
  selector: 'setting-erpconfig-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData;
  private data;
  public selectedrowData;
  private commonActionBarConfig: CommonActionBarConfig;

  //构造函数，初始化
  constructor(
    private router: Router,
    private erpconfigservice: AppconfigService,
  ){
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    //按钮组配置
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.openUrl = 'pages/setting/erpsetting/erpconfig/edit';
    this.commonActionBarConfig.editUrl = 'pages/setting/erpsetting/erpconfig/edit';
    this.commonActionBarConfig.noback = true;
  }

  //函数方法

  //行配置项(获取数据)
  private createRowData() {
    this.data =this.erpconfigservice.get();
    console.log(this.data);
  }

}
