import { Injectable }    from '@angular/core';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class OrderManagerService{
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
    return this.http.delete('/api/sale/order/order/'+id).map(res=>{
      return res.json();
    })
  }

  getwenjian(id:number){
    return this.http.get('/api/common/annex/download/'+id).map(res=>{
      return res;
    })
  }
}
