import { Injectable }    from '@angular/core';
import {Location} from '@angular/common';
import {Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpInterceptorService} from "../interceptor";
import {MessageService} from "../core/messageComponent.service";

@Injectable()

export class UserService {
  constructor(private http:HttpInterceptorService, private messageservice:MessageService, private location:Location) {
  }

  //获取用户列表
  //getlist(page?:number, key?:string) {
  //  if (key) {
  //    return this.http.get('/api/user/user' + '?page=' + page + '&keyword=' + key).map(res=> {
  //      return res.json();
  //    });
  //  } else {
  //    return this.http.get('/api/user/user' + '?page=' + page).map(res=> {
  //      return res.json();
  //    });
  //  }
  //
  //}

  getlist(key:string,page:number,department: number){
    //console.log(key,page,catalog);
    if(key){
      return this.http.get('/api/user/user'+'?filter_name='+key+'&page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.users
        }
      })
    } else if(department){
      return this.http.get('/api/user/user'+'?department_id='+department+'&page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.users
        }
      })
    } else {
      return this.http.get('/api/user/user'+'?page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.users
        }
      })
    }
  }

  //通过id获取用户
  get(id:number) {
    return this.http.get('/api/user/user/' + id).map(res=> {
      return res.json().results.data.user;
    })
  }

  //删除用户
  delete(id:number) {

    return this.http.delete('/api/user/user/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除用户成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //修改用户
  put(id:number, body) {
    return this.http.put('/api/user/user/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新用户成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新用户失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增用户
  post(body) {
    return this.http.post('/api/user/user', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建用户成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建用户失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
