import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";


@Injectable()

export class CustomersService {
  constructor(private http:HttpInterceptorService, private messageservice:MessageService, private location:Location) {
  }

  //获取客户列表
  getlist(page?:number, key?:string) {
    if (key) {
      return this.http.get('/api/customer/customer' + '?page=' + page + '&keyword=' + key).map(res=> {
        return res.json();
      });
    } else {
      return this.http.get('/api/customer/customer' + '?page=' + page).map(res=> {
        return res.json();
      });
    }

  }

  //通过id获取客户
  get(id:number) {
    return this.http.get('/api/customer/customer/' + id).map(res=> {
      return res.json().results.data.customer;
    })
  }

  //删除客户
  delete(id:number) {

    return this.http.delete('/api/customer/customer/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除客户成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //修改客户
  put(id:number, body) {
    return this.http.put('/api/customer/customer/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新客户成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新客户失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增客户
  post(body) {
    return this.http.post('/api/customer/customer', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建客户成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建客户失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
