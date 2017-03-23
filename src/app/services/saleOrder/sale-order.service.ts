import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {OrderEditModel} from "../../common/models/order_edit.model";
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";


@Injectable()

export class SaleOrderService{
  constructor (private http: HttpInterceptorService ,private messageservice: MessageService,private location:Location) {}

  //获取订单列表
  getlist(page?:number,key?:string){
    if(key){
      return this.http.get('/api/sale/order/order'+'?page='+page+'&keyword='+key).toPromise().then(res=>{
        return res.json();
      });
    } else {
      return this.http.get('/api/sale/order/order'+'?page='+page).toPromise().then(res=>{
        return res.json();
      });
    }

  }

  //通过id获取订单
  get(id:number){
    return this.http.get('/api/sale/order/order/'+id).map(res=>{
      return res.json().results.data.order;
    })
  }

  //删除订单
  delete(id:number){

    return this.http.delete('/api/sale/order/order/'+id).map(res=>{
      if(res.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除订单成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //修改订单
  put(id:number, body){
    return this.http.put('/api/sale/order/order/'+id,body).map(res=>{
      if(res.status == 200){
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新订单成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新订单失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增订单
  post(body){
    return this.http.post('/api/sale/order/order',body).map(res=>{
      if(res.status == 200){
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建订单成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建订单失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //获取主管审核订单列表
  getDirector(page?:number,key?:string){
    if(key){
      return this.http.get('/api/sale/order/update_order_status/waitsupervisorcheck'+'?page='+page+'&keyword='+key).toPromise().then(res=>{
        return res.json();
      });
    } else {
      return this.http.get('/api/sale/order/update_order_status/waitsupervisorcheck'+'?page='+page).toPromise().then(res=>{
        return res.json();
      });
    }

  }

  //获取欠尾款订单
  getBalancePayment(page?:number,key?:string){
    if(key){
      return this.http.get('/api/sale/order/order/balance_payment'+'?page='+page+'&keyword='+key).toPromise().then(res=>{
        return res.json();
      });
    } else {
      return this.http.get('/api/sale/order/order/balance_payment'+'?page='+page).toPromise().then(res=>{
        return res.json();
      });
    }

  }

  getSchedule(id:string){
    return this.http.get('/api/sale/order/order/'+id+'/order_schedule').toPromise().then(res=>{
      return res.json();
    });
  }

}
