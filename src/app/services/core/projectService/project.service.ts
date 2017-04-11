import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {GetService} from "../../../common/function/getfunction";
import {MessageService} from "../messageComponent.service";
import {Location} from '@angular/common';

@Injectable()
export class ProjectService {
  constructor(
    private getservice: GetService,
    private http:HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location,
  ){}

  get(id?: number){
    return this.getservice.get(id,'Project','project_id','getProject')
  }


  //修改表单前缀
  put(id:number, body) {
    return this.http.put('/api/localisation/project/'+ id , body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新表单前缀信息成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Project');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新表单前缀信息失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //删除表单前缀
  delete(id:number) {
    return this.http.delete('/api/localisation/project/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除表单前缀成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //新增表单前缀
  post(body) {
    return this.http.post('/api/localisation/project', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建表单前缀成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Project');
        this.get();
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建表单前缀失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
