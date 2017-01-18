import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {TestService} from './test.service';
import {LocationService} from "../../../../../../core/locationService/location.services";
import {CountryService} from "../../../../../../core/countryService/country.service";
import {PositionService} from "../../../../../../core/positionService/position.service";
import {TransportService} from "../../../../../../core/transportService/transport.service";


@Component({
  selector: 'order-manager',
  template: require('./order-list.html'),
  styles: [require('./order-list.scss')],
  providers: [TestService]
})

export class OrderManagerComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData:any[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedcolumnDefs: any[];
  public selectedrowData: any[];
  public isbatches: boolean = false;

  constructor(private router: Router,private testService: TransportService) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
  }

  //http测试
  private test($event){
    //this.testService.login('adolph@sopto.com','adph123')
    //  .subscribe(data => {
    //    console.log(data)})
    this.testService.gettransports()
    .subscribe(data=>{console.log(data.json())})
  }

  //行配置项(获取数据)
  private createRowData() {
    var rowData:any[] = [];

    //this.testService.getLocation()
    //  .subscribe(data=>{
    //    this.rowData = data.json().results.data.inquirys.data;
    //  })
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ',field:' ',width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true
      },
      {
        headerName: ' ',field: 'id', width: 30,suppressSorting: true,
        suppressMenu: true, pinned: true
      },
      {
        headerName: '订单编号',
        field: 'quote_no',
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: '订单状态',
        field: 'quote_date',
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: 'PI编号',
        field: 'validity_date',
        width: 120,
      },
      {
        headerName: '客户ID',
        field: 'delivery_date',
        width: 120,
      },
      {
        headerName: '客户名',
        field: 'table_order_id',
        width: 120,
      },
      {
        headerName: '录入人',
        field: 'remark',
        width: 120,
        editable: true //是否可双击编辑
      },
      {
        headerName: '付款方式',
        field: 'created_at',
        width: 120,
        editable: true
      },
      {
        headerName: '货币',
        field: 'updated_at',
        width: 60,
        editable: true
      },
      {
        headerName: '商品金额',
        field: 'money',
        width: 120,
        editable: true
      },
      {
        headerName: '订单金额',
        field: 'ormoney',
        width: 120,
        editable: true
      },
      {
        headerName: '收款金额',
        field: 'getmoney',
        width: 120,
        editable: true
      },
      {
        headerName: '欠尾款',
        field: 'demoney',
        width: 120,
        editable: true
      },
      {
        headerName: '欠运费',
        field: 'trmoney',
        width: 120,
        editable: true
      }
    ];
  }

  //搜索框搜索和回车事件
  public onQuickFilterChanged($event) {
    console.log(this.gridOptions);
    this.gridOptions.api.setQuickFilter($event.value);
  }
  public onQuickFilterEnter($event){
    if($event.keyCode === 13){
      this.gridOptions.api.setQuickFilter($event.target.value);
    }
  }

  //批处理操作
  private batchesClick($event){
    if(!this.isbatches){
      this.gridOptions.columnApi.setColumnVisible(' ',true);
      this.isbatches = true;
    } else {
      this.gridOptions.columnApi.setColumnVisible(' ',false);
      this.isbatches = false;
    }
  }

  //编辑操作
  private editClick($event){
    if(this.selectedrowData){
      this.router.navigate(['pages/sale/order-manager/edit',1]);
    }
  }

  //新建操作
  private addClick(){
    this.router.navigate(['pages/sale/order-manager/edit']);
  }

  //选中行列表行配置
  private onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = [$event.node.data];
      this.selectedcolumnDefs = [
        {
          headerName: '订单编号',
          field: 'id'
        },
        {
          headerName: 'PI编号',
          field: 'pi'
        },
        {
          headerName: '订单金额',
          field: 'ormoney'
        },
        {
          headerName: '客户名',
          field: 'usname'
        },
        {
          headerName: '录入人',
          field: 'addname'
        }
      ];
      this.selectedeRow = true;
    }

  }

}
