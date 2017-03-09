import { Injectable }    from '@angular/core';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {OrderEditModel} from "../../common/models/order_edit.model";
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";


@Injectable()

export class SaleOrderService{
  constructor (private http: HttpInterceptorService ,private messageservice: MessageService) {}
  getOrder(page?:number){
    return this.http.get('/api/sale/order/order'+'?page='+page).toPromise().then(res=>{
      return res.json();
    });
  }

  getSchedule(id:string){
    return this.http.get('/api/sale/order/order/'+id+'/order_schedule').toPromise().then(res=>{
      return res.json();
    });
  }

  getOrderById(id:number){
    return this.http.get('/api/sale/order/order/'+id).map(res=>{
      return res.json().results.data.order;
    })
  }

  deleteorder(id:number){
    //let token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    //let body= 'access_token='+ token;
    let options = new RequestOptions({});
    return this.http.delete('/api/sale/order/order/'+id,options).map(res=>{
      console.log(res)
      return res;
    })
  }

  addorder(id:number,order){
    //let token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    //order.access_token = token;
    //let body = decodeURIComponent(jQuery.param(order));
    //let headers = new Headers({'Content-type':'application/x-www-form-urlencoded','X-Requested-With':'XMLHttpRequest'});
    //let options = new RequestOptions({body:order});
    return this.http.put('/api/sale/order/order/'+id,order).map(res=>{
      if(res.status == 200){
        this.messageservice.putMessage({
          summary: '成功',
          detail: '更新订单成功',
          severity: 'success',
          life: 3000
        })
      } else {
        this.messageservice.putMessage({
          summary: '失败',
          detail: '更新订单失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }


  getwenjian(id:number){
    return this.http.get('/api/common/annex/download/'+id).map(res=>{
      return res;
    })
  }
}
