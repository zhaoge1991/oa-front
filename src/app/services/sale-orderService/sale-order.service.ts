import { Injectable }    from '@angular/core';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { InterceptorService } from 'ng2-interceptors';
import {OrderEditModel} from "../../common/models/order_edit.model";

@Injectable()

export class SaleOrderService{
  constructor (private http: InterceptorService) {}
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
    let token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    let body= 'access_token='+ token;
    let options = new RequestOptions({body: body});
    return this.http.delete('/api/sale/order/order/'+id).map(res=>{
      return res.json();
    })
  }

  addorder(id:number,order){
    //let token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    //order.access_token = token;
    let body = decodeURIComponent(jQuery.param(order));
    //let headers = new Headers({'Content-type':'application/x-www-form-urlencoded','X-Requested-With':'XMLHttpRequest'});
    //let options = new RequestOptions({headers:headers});
    return this.http.put('/api/sale/order/order/'+id,order).map(res=>{
      return res.json();
    });
  }


  getwenjian(id:number){
    return this.http.get('/api/common/annex/download/'+id).map(res=>{
      return res;
    })
  }
}
