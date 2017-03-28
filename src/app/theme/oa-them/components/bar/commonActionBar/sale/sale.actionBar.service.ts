import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {HttpInterceptorService} from "../../../../../../services/interceptor";
import {MessageService} from "../../../../../../services/core/messageComponent.service";
import {Order} from "../../../../../../models/sale/order/Order";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {OrderOperat} from "../../../../../../models/sale/order/OrderOperat";


@Injectable()
export class SaleActionBarService{
  constructor(private http: HttpInterceptorService,private messageservice: MessageService,private appconfig: AppconfigService){}

  toship(id: number){
    return this.http.post('/api/sale/order/order/to_shipment',{order_ids:id}).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '生成出运安排成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  orderdemand(id: number){
    return this.http.post('/api/sale/order/order/to_demand',{order_ids:id}).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '生成订单要求成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  supaudit(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '请主管审核发送成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  financeaudit(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '请财务审核发送成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  procurementaudit(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '请采购审核发送成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  toshipment(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '请货运发货发送成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  cusrecive(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '客户已收货成功',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  isdone(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '订单已完成',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  procurementcheck(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '订单已完成',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  getOperat(object:Order){
    let operat: OrderOperat = new OrderOperat();
    operat.toship = true;
    operat.orderdemand = true;
    switch (object.order_type_id){
    /**部分付款和账期订单**/
      case (this.appconfig.get('sale.order.type.part') || this.appconfig.get('sale.order.type.time')):
        //订单状态判断
        switch (object.order_status_id) {
        /**待处理订单**/
          case this.appconfig.get('sale.order.status.waitpayment'):
            operat.supaudit = true;break
        /**主管审核通过订单**/
          case this.appconfig.get('sale.order.status.supervisorcheckcomplate'):
            operat.financeaudit = true;break
        /**财务审核通过订单**/
          case this.appconfig.get('sale.order.status.paid'):
            operat.procurement = true;break
        /**待销售确认订单**/
          case this.appconfig.get('sale.order.status.waitsalecheck'):
            operat.toshipment = true;break
        /**已发货订单**/
          case this.appconfig.get('sale.order.status.delivered'):
            operat.cusrecive = true;break
        /**客户已收货**/
          case this.appconfig.get('sale.order.status.customerreceived'):
            operat.isdone = true;break
        };
        break;
    /**免费样品单**/
      case this.appconfig.get('sale.order.type.free'):
        switch (object.order_status_id) {
        /**待处理订单**/
          case this.appconfig.get('sale.order.status.waitpayment'):
            operat.supaudit = true;break
        /**主管审核通过订单**/
          case this.appconfig.get('sale.order.status.supervisorcheckcomplate'):
            operat.financeaudit = true;break
        /**财务审核通过订单**/
          case this.appconfig.get('sale.order.status.paid'):
            operat.procurement = true;break
        /**待销售确认订单**/
          case this.appconfig.get('sale.order.status.waitsalecheck'):
            operat.toshipment = true;break
        /**已发货订单**/
          case this.appconfig.get('sale.order.status.delivered'):
            operat.cusrecive = true;break
        /**客户已收货**/
          case this.appconfig.get('sale.order.status.customerreceived'):
            operat.procurementcheck = true;break
        };
        break;
      default:
        switch (object.order_status_id) {
        /**待处理订单**/
          case this.appconfig.get('sale.order.status.waitpayment'):
            operat.financeaudit = true;break
        /**财务审核通过订单**/
          case this.appconfig.get('sale.order.status.paid'):
            operat.procurement = true;break
        /**待销售确认订单**/
          case this.appconfig.get('sale.order.status.waitsalecheck'):
            operat.toshipment = true;break
        /**已发货订单**/
          case this.appconfig.get('sale.order.status.delivered'):
            operat.cusrecive = true;break
        /**客户已收货**/
          case this.appconfig.get('sale.order.status.customerreceived'):
            operat.isdone = true;break
        };
    }
    return operat;
  }
}
