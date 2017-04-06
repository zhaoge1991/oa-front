import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {OrderService} from "../../../../services/order/order.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {StatusService} from "../../../../services/core/statusService/status.service";
import {AlertService} from "../../../../services/core/alert.component.service";
import {Order} from "../../../../models/sale/order/Order";
import {Paginate} from "../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {CountryService} from "../../../../services/core/countryService/country.service";

@Component({
  selector: 'procurement-order-product',
  templateUrl: './product.html',
  styleUrls: ['./product.scss']
})

export class ProductComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: Order[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedcolumnDefs: any[];
  public selectedrowData: Order;
  public isbatches: boolean = false;
  //翻页配置
  private paginate : Paginate;
  private selectedIndex:number;
  private searchtext:string = '';
  private actionConfig: CommonActionBarConfig;
  //选中行列表行配置
  private proData;
  private orderpaymentData;
  private orderscheduleData;
  private isfreeorder: boolean = false;
  
  //选中多行
  public selectedRows;
  

  pageClick($event){
    this.createRowData($event.text-0,this.searchtext);
    this.selectedeRow = false;
    this.selectedrowData = null;
  }
  search($event){
    this.createRowData(1,$event);
    this.searchtext = $event;
    this.selectedeRow = false;
    this.selectedrowData = null;
  }
  constructor(
    private router: Router,
    private listservice: OrderService,
    private cus: CurrencyService,
    private payment: PaymentService,
    private currency: CurrencyService,
    private status: StatusService,
    private quantifier: QuantifierService,
    private appconfig: AppconfigService,
    private alertservice: AlertService,
    private country: CountryService
  ) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData(1);
    this.createColumnDefs();
    this.showGrid = true;
    //按钮组配置
    
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.generateProcurementOrder = true;
    this.actionConfig.generateFreezeOrder = true;
  }

  //行配置项(获取数据)
  private createRowData(page,key?:string) {
    this.listservice.getProductList(page,key)
      .subscribe(data=>{
        this.paginate  = this.rowData = data.results.data.products;
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
        headerName: '订单编号',
        field: 'p_order',
        width: 180,
        cellRenderer: (params)=>{
          let data = params.value;
          return data?data['order_no']:'';
        },
        pinned: true //固定列
      },
      {
        headerName: 'PI编号',
        field: 'pi',
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: '中文描述',
        field: 'zh_name',
        width: 120,
      },
      {
        headerName: '销售',
        field: 'p_order',
        cellRenderer: (params)=>{
          let order = params.value;
          let customer = order?order['customer']:'';
          let users = customer?customer['users']:'';
          return users?users[0]['name']:'';
          
        },
        width: 80,
      },
      {
        headerName: '销售数量',
        field: 'quantity',
        width: 120,
      },
      {
        headerName: '待处理数',
        field: 'wait_process_quantity',
        width: 120,
      },
      {
        headerName: '可用库存',
        field: 'enable_quantity',
        width: 120,
       
      },
      {
        headerName: '总冻结数',
        field: 'freeze_quantity',
        width: 120,
        
      }
    ];
  }

  

  private onRowSelected($event) {
      this.selectedRows = this.gridOptions.api.getSelectedRows();
    if($event.node.selected){
      this.selectedrowData = $event.node.data as Order;
      this.selectedIndex = $event.node.rowIndex;
      this.selectedeRow = true;
    }
  }

  //批处理操作
  //private batchesClick($event){
  //  if(!this.isbatches){
  //    this.gridOptions.columnApi.setColumnVisible(' ',true);
  //    this.isbatches = true;
  //  } else {
  //    this.gridOptions.columnApi.setColumnVisible(' ',false);
  //    this.isbatches = false;
  //  }
  //}


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

  //双击列表单元格操作
  onCellDoubleClicked($event){
   
  }

  //选中订单数据改变
  objectChange(event){
    this.selectedrowData = null;
    this.createRowData(this.paginate.current_page);
  }
  onBarComplete(event:boolean){
      if(event){
      this.selectedrowData = null;
    this.createRowData(this.paginate.current_page);
      }
  }
}
