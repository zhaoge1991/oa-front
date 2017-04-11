import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";
import {MessageService} from "../messageComponent.service";
import {Location} from '@angular/common';

@Injectable()
export class CountryService {
  constructor(
    private getservice: GetService,
    private http:HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location,
){}

  get(id?:number){
    return this.getservice.get(id,'Country','country_id','getCountry')
  }

  //修改国家
  put(id:number, body) {
    return this.http.put('/api/localisation/country/'+ id , body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新国家信息成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Country');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新国家信息失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //删除国家
  delete(id:number) {
    return this.http.delete('/api/localisation/country/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除国家成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Country');
        this.get();
      }
      return res;
    })
  }

  //新增国家
  post(body) {
    return this.http.post('/api/localisation/country', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建国家成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Country');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建国家失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }
}
