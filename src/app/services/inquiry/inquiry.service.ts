import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import { URLSearchParams,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";


@Injectable()

export class InquiryService {
  constructor(private http:HttpInterceptorService, private messageservice:MessageService, private location:Location) {
  }

  //获取外销表单列表
  getlist(page?:number, key?:string) {
    if (key) {
      return this.http.get('/api/sale/table/inquiry' + '?page=' + page + '&keyword=' + key).map(res=> {
        return res.json();
      });
    } else {
      return this.http.get('/api/sale/table/inquiry' + '?page=' + page).map(res=> {
        return res.json();
      });
    }

  }

  //通过id获取外销报价单
  get(id:number) {
    return this.http.get('/api/sale/table/inquiry/' + id).map(res=> {
      return res.json().results.data.inquiry;
    })
  }

  //删除外销报价单
  delete(id:number) {

    return this.http.delete('/api/sale/table/inquiry/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除外销报价单成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //修改外销报价单
  put(id:number, body) {
    return this.http.put('/api/sale/table/inquiry/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新外销报价单成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新外销报价单失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增外销报价单
  post(body) {
    return this.http.post('/api/sale/table/inquiry', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建外销报价单成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建外销报价单失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
