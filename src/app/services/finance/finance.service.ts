import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {OrderEditModel} from "../../common/models/order_edit.model";
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";


@Injectable()

export class FinanceService{
  constructor (private http: HttpInterceptorService ,private messageservice: MessageService,private location:Location) {}

  check(body){
    if(body.reason){
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
    } else {
      return this.http.put('/api/finance/order/'+body.order_id,body).map(data=>{
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
  }

  price(body){
    if(body.reason){
      return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
        if(data.status == 200){
          this.messageservice.putMessage({
            summary: '成功',
            detail: '录入完成',
            severity: 'success',
            life: 3000
          })
        }
        return data.json();
      })
    } else {
      return this.http.post('/api/finance/order/'+body.order_id+'/receipt_order_payment',body).map(data=>{
        if(data.status == 200){
          this.messageservice.putMessage({
            summary: '成功',
            detail: '录入完成',
            severity: 'success',
            life: 3000
          })
        }
        return data.json();
      })
    }
  }

  tanceportPrice(body){
    if(body.reason){
      return this.http.post('/api/sale/order/update_order_status/update',body).map(data=>{
        if(data.status == 200){
          this.messageservice.putMessage({
            summary: '成功',
            detail: '录入完成',
            severity: 'success',
            life: 3000
          })
        }
        return data.json();
      })
    } else {
      return this.http.post('/api/finance/order/'+body.order_id+'/receipt_order_shipping',body).map(data=>{
        if(data.status == 200){
          this.messageservice.putMessage({
            summary: '成功',
            detail: '录入完成',
            severity: 'success',
            life: 3000
          })
        }
        return data.json();
      })
    }
  }

  putTip(id:number,message: any){
    return this.http.post('/api/finance/order/'+id+'/hint_sale_payment',message).map(data=>{
      if(data.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '提醒催款完成',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

}
