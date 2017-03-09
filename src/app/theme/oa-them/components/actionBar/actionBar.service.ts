import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../../../services/interceptor";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {MessageService} from "../../../../services/core/messageComponent.service";

@Injectable()
export class ActionBarService{
  constructor(private http: HttpInterceptorService,private messageservice: MessageService){}

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
}
