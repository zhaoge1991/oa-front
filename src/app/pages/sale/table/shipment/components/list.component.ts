import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {CurrencyService} from "../../../../../services/core/currencyService/currency.service";
import {PaymentService} from "../../../../../services/core/paymentService/payment.service";
import {QuantifierService} from "../../../../../services/core/quantifierService/quantifier.service";
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";
import {StatusService} from "../../../../../services/core/statusService/status.service";
import {AlertService} from "../../../../../services/core/alert.component.service";
import {Paginate} from "../../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {TransportService} from "../../../../../services/core/transportService/transport.service";
import {ShipmentService} from "../../../../../services/shipment/shipment.service";
import {TableShipment} from "../../../../../models/sale/table/TableShipment";


@Component({
  selector: 'sale-table-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: TableShipment[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedcolumnDefs: any[];
  public selectedrowData: TableShipment;
  public isbatches: boolean = false;
  //翻页配置
  private paginate : Paginate;
  private selectedIndex:number;

  pageClick($event){
    this.createRowData($event.text-0,this.searchtext);
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  private searchtext:string = '';
  search($event){
    this.createRowData(1,$event);
    this.searchtext = $event;
    this.selectedeRow = false;
    this.selectedrowData = null;
  }

  actionConfig:CommonActionBarConfig;
  constructor(
    private router: Router,
    private listservice: ShipmentService,
    private cus: CurrencyService,
    private payment: PaymentService,
    private currency: CurrencyService,
    private transport: TransportService,
    private status: StatusService,
    private quantifier: QuantifierService,
    private appconfig: AppconfigService,
    private alertservice: AlertService
  ) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData(1);
    this.createColumnDefs();
    this.showGrid = true;
    //按钮组配置
    this.actionConfig = new CommonActionBarConfig();
    this.actionConfig.addNewUrl = 'pages/sale/table/shipment/edit';
    this.actionConfig.deleteUrl = '/api/sale/table/shipment/';
    this.actionConfig.openUrl = 'pages/sale/table/shipment/detail';
    this.actionConfig.idName = 'id';
    this.actionConfig.editUrl = 'pages/sale/table/shipment/edit';
    this.actionConfig.canEexport = {pdf:true};
    this.actionConfig.noback = true;
  }

  //行配置项(获取数据)
  private createRowData(page,key?:string) {
    this.listservice.getlist(page,key)
      .subscribe(data=>{
        this.paginate = data.results.data.shipments;
        this.rowData = this.paginate.data;
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
        headerName: '出运安排编号',
        field: 'commercial_invoice',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '关联订单号',
        field: 'commercial_invoice',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '客户名',
        field: 'customer',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          return data?data[params.property]:''
        },
        cellRendererParams: {
          property: 'firstname'
        },
        pinned: true //固定列
      },
      {
        headerName: 'Pi编号',
        field: 'remark',
        width: 260,
      },
      {
        headerName: '录入时间',
        field: 'created_at',
        width: 260,
      },
      {
        headerName: '出运日期',
        field: 'shipment_date',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '付款方式',
        field: 'table_order',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value.payment_id;
          if(data){
            let status = this.payment.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '运输方式',
        field: 'table_order',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value.transport_id;
          if(data){
            let status = this.transport.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        }
      },
      {
        headerName: '货币',
        field: 'currency_id',
        width: 60,
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.currency.get(data)
            return status[params.property];
          } else return '';
        },
        cellRendererParams: {
          property: 'code'
        }
      },
      {
        headerName: '总金额',
        field: 'table_order',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          return data?data[params.property]:'';
        },
        cellRendererParams: {
          property: 'total_price'
        }
      },
      {
        headerName: '价格条款',
        field: 'table_order',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          return data?(data[params.property]?data[params.property].name:''):'';
        },
        cellRendererParams: {
          property: 'provision'
        }
      },
      {
        headerName: '录入人',
        field: 'user',
        width: 120,
        editable: false, //是否可双击编辑
        cellRenderer: (params)=>{
          let data = params.value;
          return (data&&!(data instanceof Array))?data[params.property]:'';
        },
        cellRendererParams: {
          property: 'name'
        },
      },
      {
        headerName: '备注',
        field: 'remark',
        width: 260,
      }
    ];
  }

  //选中行列表行配置
  private proData;
  private customerData;
  private ordercostData;
  provision;
  private ordercostCol = [
    {
      headerName: "#", width: 30,suppressSorting: true,
      suppressMenu: true, pinned: true,
      cellRenderer: function (params) {
        return params.rowIndex+1
      }
    },
    {headerName: '费用名称',field: 'name',width: 240},
    {headerName: '费用金额',field: 'price',width: 240}
  ];
  private orderpaymentData;

  private onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = $event.node.data as TableShipment;
      this.selectedIndex = $event.node.rowIndex;
      //产品清单数据
      this.proData =  this.selectedrowData.table_order_product;
      this.selectedcolumnDefs = [
        {
          headerName: '产品id',
          field: 'product_id',
          width: 90,
        },
        {
          headerName: '产品型号',
          field: 'model',
          width: 160,
        },
        {
          headerName: '中文描述',
          field: 'zh_name',
          width: 480,
        },
        {
          headerName: '英文描述',
          field: 'en_name',
          width: 480,
        },
        {
          headerName: '单位',
          field: 'quantifier_id',
          width: 60,
          cellRenderer: (params)=>{
            let data = params.value;
            if(data){
              let quantifierdata=this.quantifier.get(data);
              return quantifierdata[params.property];
            } else return '';
          },
          cellRendererParams: {
            property: 'code'
          },
        },
        {
          headerName: '数量',
          field: 'quantity',
          width: 60,
        },
        {
          headerName: '实际销售单价',
          field: 'price',
          width: 120,
        },
        {
          headerName: '实际销售金额',
          field: 'total',
          width: 120,
        },
        {
          headerName: '指导价',
          field: 'reference_price',
          width: 90,
        }
      ];

      //用户数据
      this.customerData = this.selectedrowData.customer;

      //其他费用数据
      this.ordercostData = this.selectedrowData.table_order_cost;

      //支付方式数据
      this.orderpaymentData = this.payment.get(this.selectedrowData.table_order.payment_id);

      //价格条款数据
      this.provision = this.selectedrowData.table_order.provision;

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
    this.router.navigate(['pages/sale/table/shipment/detail/',$event.data.id])
  }

  //删除操作
  deleteData(e){
    if(e){
      this.listservice.delete(this.selectedrowData.id).subscribe(data=>{
        this.selectedrowData = null;
        this.createRowData(this.paginate.current_page);
      })
    }
  }

  //选中订单数据改变
  objectChange(){
    this.selectedrowData = null;
    this.createRowData(this.paginate.current_page);
  }
}
