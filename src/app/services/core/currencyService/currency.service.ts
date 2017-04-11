import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";
import {MessageService} from "../messageComponent.service";
import {Location} from '@angular/common';

@Injectable()
export class CurrencyService {
  constructor(
    private getservice: GetService,
    private http:HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location,
  ){}

  get(id?: number){
    return this.getservice.get(id,'Currency','currency_id','getCurrency')
  }


  //修改货币
  put(id:number, body) {
    return this.http.put('/api/localisation/currency/'+ id , body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新货币信息成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Currency');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新货币信息失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //删除货币
  delete(id:number) {
    return this.http.delete('/api/localisation/currency/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除货币成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Currency');
        this.get();
      }
      return res;
    })
  }

  //新增货币
  post(body) {
    return this.http.post('/api/localisation/currency', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建货币成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Currency');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建货币失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
