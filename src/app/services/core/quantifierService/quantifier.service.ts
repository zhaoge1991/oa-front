import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {GetService} from "../../../common/function/getfunction";
import {Location} from '@angular/common';
import {MessageService} from "../messageComponent.service";

@Injectable()
export class QuantifierService {
  constructor(
    private getservice: GetService,
    private http:HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location,
  ){}

  get(id?: number){
    return this.getservice.get(id,'Quantifier','quantifier_id','getQuantifiers')
  }


  //修改数量词
  put(id:number, body) {
    return this.http.put('/api/localisation/quantifier/'+ id , body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新数量词信息成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Quantifier');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新数量词信息失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //删除货币
  delete(id:number) {
    return this.http.delete('/api/localisation/quantifier/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除数量词成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Quantifier');
        this.get();
      }
      return res;
    })
  }

  //新增货币
  post(body) {
    return this.http.post('/api/localisation/quantifier', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建数量词成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Quantifier');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建数量词失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }


}
