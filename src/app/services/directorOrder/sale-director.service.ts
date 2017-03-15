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

export class SaleDirectorService{
  constructor (private http: HttpInterceptorService ,private messageservice: MessageService,private location:Location) {}
  getlist(page?:number,key?:string){
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

  delete(id:number){
    let options = new RequestOptions({});
    return this.http.delete('/api/sale/order/order/'+id,options).map(res=>{
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

  getSchedule(id:string){
    return this.http.get('/api/sale/order/order/'+id+'/order_schedule').toPromise().then(res=>{
      return res.json();
    });
  }

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
}
