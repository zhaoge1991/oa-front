import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {HttpInterceptorService} from "../../services/interceptor"
import {MessageService} from "../core/messageComponent.service";
import {Order} from "../../models/sale/order/Order";
import {OrderOperat} from "../../models/sale/order/OrderOperat";
import {AppconfigService} from "../core/appConfigService/appConfigService";
@Injectable()
export class ProcurementSaleOrderService {
  constructor(private http: HttpInterceptorService,private messageservice: MessageService,private appconfig: AppconfigService) {}

  check(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '审核完成',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  closure(body){
    return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '核销完成',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

  getOperat(object:Order) {
    let operat:OrderOperat = new OrderOperat();
    switch (object.order_type_id) {
    /**免费样品单**/
      case this.appconfig.get('sale.order.type.free'):
        switch (object.order_status_id) {
        /**待采购确认订单**/
          case this.appconfig.get('sale.order.status.waitprocurementverification'):
            operat.closure = true;
            break;
        }
      default:
        operat.empty = true;
    }
    return operat;
  }
}
