import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";


@Injectable()

export class ShippingService {
  constructor(private http:HttpInterceptorService, private messageservice:MessageService, private location:Location) {
  }

  //修改货运订单
  put(id:number, body) {
    return this.http.put('/api/shipping/order/' + id, body).map(res=> {
      if (res.status == 200) {
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

  //已发货状态改变
  shipping(body) {
    return this.http.post('/api/sale/order/update_order_status/update', body).map(data=> {
      if (data.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '完成发货',
          severity: 'success',
          life: 3000
        })
      }
      return data.json();
    })
  }

}
