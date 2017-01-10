import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {TestService} from './test.service';

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

  constructor(private router: Router,private testService: TestService) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
  }

  //http测试
  private test($event){
    this.testService.login('adolph@sopto.com','adolph123')
      .subscribe(data => {
        console.log(data)})
  }

  //行配置项(获取数据)
  private createRowData() {
    var rowData:any[] = [];

    for (var i = 0; i < 500; i++) {
      rowData.push({
        num: i+1,
        id: 'CZK-'+Math.random()*1000000,
        state: Math.random()>0.5 ? '客户已收货':'已发货',
        pi: 'SOP-'+Math.random()*1000000,
        usid: 'SOP'+Math.random()*1000,
        usname: Math.random()>0.5 ? 'Nelson':'Apolph',
        addname: Math.random()>0.5 ? 'lucy':'starain',
        pay: Math.random()>0.5 ? 'paypal':'T/T',
        doll: Math.random()>0.5 ? 'USD':'EUR',
        money: Math.random()*10000,
        ormoney:  Math.random()*10000,
        getmoney:  Math.random()*10000,
        demoney:  Math.random()*10000,
        trmoney:  Math.random()*10000
      });
    }

    this.rowData = rowData;
  }

  //列配置项
  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: ' ',field:' ',width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, hide: true
      },
      {
        headerName: ' ',field: 'num', width: 30,suppressSorting: true,
        suppressMenu: true, pinned: true
      },
      {
        headerName: '订单编号',
        field: 'id',
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: '订单状态',
        field: 'state',
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: 'PI编号',
        field: 'pi',
        width: 120,
      },
      {
        headerName: '客户ID',
        field: 'usid',
        width: 120,
      },
      {
        headerName: '客户名',
        field: 'usname',
        width: 120,
      },
      {
        headerName: '录入人',
        field: 'addname',
        width: 120,
        editable: true //是否可双击编辑
      },
      {
        headerName: '付款方式',
        field: 'pay',
        width: 120,
        editable: true
      },
      {
        headerName: '货币',
        field: 'doll',
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
