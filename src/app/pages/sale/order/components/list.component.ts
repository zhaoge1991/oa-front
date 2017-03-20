import {Component,ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {SaleOrderService} from "../../../../services/saleOrder/sale-order.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {StatusService} from "../../../../services/core/statusService/status.service";
import {AlertService} from "../../../../services/core/alert.component.service";
import {SaleOrder} from "../../../../models/sale/saleOrder";
import {Paginate} from "../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";

@Component({
  selector: 'sale-order-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})

export class ListComponent{
  private gridOptions:GridOptions;
  public showGrid:boolean;
  public rowData: SaleOrder[];
  private columnDefs:any[];
  private selectedeRow: boolean;
  public selectedcolumnDefs: any[];
  public selectedrowData: SaleOrder;
  public isbatches: boolean = false;
  private listdata:any[];
  //翻页配置
  private paginate : Paginate;
  private selectedIndex:number;

  ////操作组配置
  //private operat:{
  //  toship?: boolean,
  //  orderdemand?: boolean,
  //  supaudit?: boolean,
  //  financeaudit?: boolean,
  //  procurement?: boolean,
  //  toshipment?: boolean,
  //  cusrecive?: boolean,
  //  procurementcheck?: boolean,
  //  isdone?: boolean
  //} = {};

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

  private actionConfig: CommonActionBarConfig;
  constructor(
    private router: Router,
    private listservice: SaleOrderService,
    private cus: CurrencyService,
    private payment: PaymentService,
    private currency: CurrencyService,
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
    this.actionConfig.addNewUrl = 'pages/procurement/procurement_order/edit';
    this.actionConfig.openUrl = 'pages/procurement/procurement_order/detail';
    this.actionConfig.idName = 'procurement_order_id';
    this.actionConfig.editUrl = 'pages/procurement/procurement_order/edit';
    this.actionConfig.isProcurementOrder = true;
  }

  //行配置项(获取数据)
  private createRowData(page,key?:string) {
    this.listservice.getlist(page,key)
      .then(data=>{
        this.paginate = data.results.data.orders;
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
        headerName: '订单编号',
        field: 'order_no',
        width: 180,
        pinned: true //固定列
      },
      {
        headerName: '订单状态',
        field: 'order_status_id',
        cellRenderer: (params)=>{
          let data = params.value;
          if(data){
            let status = this.status.get(data)
            if(status){return status[params.property]}else return '';
          } else return '';
        },
        cellRendererParams: {
          property: 'name'
        },
        width: 120,
        pinned: true //固定列
      },
      {
        headerName: '订单分类',
        field: 'type',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
          return data?data[params.property]:'';
        },
        cellRendererParams: {
          property: 'name'
        },
      },
      {
        headerName: 'PI编号',
        field: 'pi',
        width: 120,
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
        headerName: '付款方式',
        field: 'payment_id',
        width: 120,
        cellRenderer: (params)=>{
          let data = params.value;
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
        headerName: '应收账款',
        field: 'product_price',
        width: 120
      },
      {
        headerName: '已收款',
        field: 'actual_payment',
        width: 120
      },
      {
        headerName: '欠尾款',
        width: 120,
        cellRenderer: (params)=>{
          let rowdata = params.data;
          let money = rowdata.product_price - rowdata.actual_payment;
          return money>=0?money:0;
        }
      }
    ];
  }

  //选中行列表行配置
  private proData;
  private customerData;
  private ordercostData;
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
  private orderscheduleData;
  private isfreeorder: boolean = false;
  private sampleData;

  private onRowSelected($event) {
    if($event.node.selected){
      this.selectedrowData = this.listdata[$event.node.data.index];

      //产品清单数据
      this.proData =  this.selectedrowData.products;
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
          width: 90,
        },
        {
          headerName: '实际销售金额',
          field: 'total',
          width: 90,
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
      this.ordercostData = this.selectedrowData.ordercost;

      //支付方式数据
      this.orderpaymentData = this.payment.get(this.selectedrowData.payment_id);

      //this.sampleData = {
      //  sample_fee_info: '免费样品',
      //  sample_shipping_info: this.selectedrowData.sample_shipping_info,
      //  disabled: false
      //}

      ////订单进度数据
      //this.listservice.getSchedule(this.selectedrowData.order_id).then(res=>{
      //    this.orderscheduleData=res.results.data.order;
      //  }
      //);


      //生成操作配置
      //订单类型判断
      //this.operat = {toship: true,orderdemand: true};
      //switch (this.selectedrowData.order_type_id){
      ///**部分付款和账期订单**/
      //  case (this.appconfig.get('sale.order.type.part') || this.appconfig.get('sale.order.type.time')):
      //    this.isfreeorder = false;
      //    //订单状态判断
      //    switch (this.selectedrowData.order_status_id) {
      //    /**待处理订单**/
      //      case this.appconfig.get('sale.order.status.waitpayment'):
      //        this.operat.supaudit = true;break
      //    /**主管审核通过订单**/
      //      case this.appconfig.get('sale.order.status.supervisorcheckcomplate'):
      //        this.operat.financeaudit = true;break
      //    /**财务审核通过订单**/
      //      case this.appconfig.get('sale.order.status.paid'):
      //        this.operat.procurement = true;break
      //    /**待销售确认订单**/
      //      case this.appconfig.get('sale.order.status.waitsalecheck'):
      //        this.operat.toshipment = true;break
      //    /**已发货订单**/
      //      case this.appconfig.get('sale.order.status.delivered'):
      //        this.operat.cusrecive = true;break
      //    /**客户已收货**/
      //      case this.appconfig.get('sale.order.status.customerreceived'):
      //        this.operat.isdone = true;break
      //    };
      //    break;
      ///**免费样品单**/
      //  case this.appconfig.get('sale.order.type.free'):
      //    this.isfreeorder = true;
      //    switch (this.selectedrowData.order_status_id) {
      //    /**待处理订单**/
      //      case this.appconfig.get('sale.order.status.waitpayment'):
      //        this.operat.supaudit = true;break
      //    /**主管审核通过订单**/
      //      case this.appconfig.get('sale.order.status.supervisorcheckcomplate'):
      //        this.operat.financeaudit = true;break
      //    /**财务审核通过订单**/
      //      case this.appconfig.get('sale.order.status.paid'):
      //        this.operat.procurement = true;break
      //    /**待销售确认订单**/
      //      case this.appconfig.get('sale.order.status.waitsalecheck'):
      //        this.operat.toshipment = true;break
      //    /**已发货订单**/
      //      case this.appconfig.get('sale.order.status.delivered'):
      //        this.operat.cusrecive = true;break
      //    /**客户已收货**/
      //      case this.appconfig.get('sale.order.status.customerreceived'):
      //        this.operat.procurementcheck = true;break
      //    };
      //    break;
      //  default:
      //    this.isfreeorder = false;
      //    switch (this.selectedrowData.order_status_id) {
      //    /**待处理订单**/
      //      case this.appconfig.get('sale.order.status.waitpayment'):
      //        this.operat.financeaudit = true;break
      //    /**财务审核通过订单**/
      //      case this.appconfig.get('sale.order.status.paid'):
      //        this.operat.procurement = true;break
      //    /**待销售确认订单**/
      //      case this.appconfig.get('sale.order.status.waitsalecheck'):
      //        this.operat.toshipment = true;break
      //    /**已发货订单**/
      //      case this.appconfig.get('sale.order.status.delivered'):
      //        this.operat.cusrecive = true;break
      //    /**客户已收货**/
      //      case this.appconfig.get('sale.order.status.customerreceived'):
      //        this.operat.isdone = true;break
      //    };
      //}

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
    this.router.navigate(['pages/sale/order/detail/',$event.data.order_id])
  }

  //删除操作
  deleteData(){
    let sub = this.alertservice.putMessage({
      title: '询问弹窗',
      detail: '确定要删除订单吗？',
      severity: 'info'
    }).subscribe(data=>{
      if(data){
        this.listservice.delete(this.selectedrowData.order_id).subscribe(data=>{
          this.selectedrowData = null;
          this.createRowData(this.paginate.current_page);
        })
      }
      sub.unsubscribe();
    });

  }
}
