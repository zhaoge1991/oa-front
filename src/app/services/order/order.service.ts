import { Injectable }    from '@angular/core';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class OrderService{
  constructor (private http: InterceptorService) {}
  getOrders(page?:number){
    return this.http.get('/api/sale/order/order'+'?page='+page).toPromise().then(res=>{
      return res.json();
    });
  }

  getSchedules(id:string){
    return this.http.get('/api/sale/order/order/'+id+'/order_schedule').toPromise().then(res=>{
      return res.json();
    });
  }

  getOrder(id:number){
    return this.http.get('/api/sale/order/order/'+id).map(res=>{
      return res.json().results.data.order;
    })
  }

  delete(id:number){
    let token = JSON.parse(localStorage.getItem('currentUser')).access_token;
    let body= 'access_token='+ token;
    let options = new RequestOptions({body: body});
    return this.http.delete('/api/sale/order/order/'+id,options).map(res=>{
      return res.json();
    })
  }

  getwenjian(id:number){
    return this.http.get('/api/common/annex/download/'+id).map(res=>{
      return res;
    })
  }
}
