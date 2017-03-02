import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {Location} from '@angular/common';
import {OrderManagerService} from "../../../../ordermanager.service";
import {AppconfigService} from "../../../../../../core/appConfigService/appConfigService";

@Component({
  selector:'',
  template: require('./order-detail.html'),
  styles: [require('./order-detail.scss')]
})

export class OrderDetailComponent implements OnInit,OnDestroy{
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: OrderManagerService,
    private appconfig: AppconfigService
  ){}

  private id:number;
  private data: any;
  private sub:any;
  private isdone: boolean;
  private ordertype: number;
  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  //按钮组配置
  private actionConfig={
    showbtn:{add:true,edit:true,action:true,export:true,annex:true,delete:true,close:true},
    openurl: 'pages/sale/order-manager/detail',
    addurl: 'pages/sale/order-manager/edit',
    idname: 'order_id'
  };
  //操作组配置
  private operat:{
    toship?: boolean,
    orderdemand?: boolean,
    supaudit?: boolean,
    financeaudit?: boolean,
    procurement?: boolean,
    toshipment?: boolean,
    cusrecive?: boolean,
    procurementcheck?: boolean,
    isdone?: boolean
  } = {};

  getById(id:number){
    this.orderservice.getOrderById(id).subscribe(data=>{
      //判断是否已完成
      this.isdone = (data.order_status_id===this.appconfig.get('sale.order.status.complete'))? true:false;
      //判断订单是否为免费样品单
      if(data.order_type_id == this.appconfig.get('sale.order.type.free')){
        this.ordertype = 0; //免费样品单为0
      } else {
        this.ordertype = 1; //其他单为1
      };
      this.data = data;

      //生成操作配置
      //订单类型判断
      this.operat = {toship: true,orderdemand: true};
      switch (this.data.order_type_id){
      /**部分付款和账期订单**/
        case (this.appconfig.get('sale.order.type.part') || this.appconfig.get('sale.order.type.time')):
          //订单状态判断
          switch (this.data.order_status_id) {
          /**待处理订单**/
            case this.appconfig.get('sale.order.status.waitpayment'):
              this.operat.supaudit = true;break
          /**主管审核通过订单**/
            case this.appconfig.get('sale.order.status.supervisorcheckcomplate'):
              this.operat.financeaudit = true;break
          /**财务审核通过订单**/
            case this.appconfig.get('sale.order.status.paid'):
              this.operat.procurement = true;break
          /**待销售确认订单**/
            case this.appconfig.get('sale.order.status.waitsalecheck'):
              this.operat.toshipment = true;break
          /**已发货订单**/
            case this.appconfig.get('sale.order.status.delivered'):
              this.operat.cusrecive = true;break
          /**客户已收货**/
            case this.appconfig.get('sale.order.status.customerreceived'):
              this.operat.isdone = true;break
          };
          break;
      /**免费样品单**/
        case this.appconfig.get('sale.order.type.free'):
          switch (this.data.order_status_id) {
          /**待处理订单**/
            case this.appconfig.get('sale.order.status.waitpayment'):
              this.operat.supaudit = true;break
          /**主管审核通过订单**/
            case this.appconfig.get('sale.order.status.supervisorcheckcomplate'):
              this.operat.financeaudit = true;break
          /**财务审核通过订单**/
            case this.appconfig.get('sale.order.status.paid'):
              this.operat.procurement = true;break
          /**待销售确认订单**/
            case this.appconfig.get('sale.order.status.waitsalecheck'):
              this.operat.toshipment = true;break
          /**已发货订单**/
            case this.appconfig.get('sale.order.status.delivered'):
              this.operat.cusrecive = true;break
          /**客户已收货**/
            case this.appconfig.get('sale.order.status.customerreceived'):
              this.operat.procurementcheck = true;break
          };
          break;
        default:
          switch (this.data.order_status_id) {
          /**待处理订单**/
            case this.appconfig.get('sale.order.status.waitpayment'):
              this.operat.financeaudit = true;break
          /**财务审核通过订单**/
            case this.appconfig.get('sale.order.status.paid'):
              this.operat.procurement = true;break
          /**待销售确认订单**/
            case this.appconfig.get('sale.order.status.waitsalecheck'):
              this.operat.toshipment = true;break
          /**已发货订单**/
            case this.appconfig.get('sale.order.status.delivered'):
              this.operat.cusrecive = true;break
          /**客户已收货**/
            case this.appconfig.get('sale.order.status.customerreceived'):
              this.operat.procurementcheck = true;break
          };
      }
    })
  }

  download(id:number){
    this.orderservice.getwenjian(id).subscribe();
  }

}


