import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../interceptor";

@Injectable()
export class CurentUserService{
  constructor(private http: HttpInterceptorService){}

  //获取当前用户
  getuser(){
    return this.http.get('/api/user/user/current').map(data=>{
      let userdata = data.json();
      return userdata.results.data.user?userdata.results.data.user:{}
    })
  }

  //获取当前用户角色
  getRoles(){
    return this.http.get('/api/user/user/roles').map(data=>{
      let userdata = data.json();
      return userdata.results.data.roles?userdata.results.data.roles:[];
    })
  }

  //获取当前用户权限
  getPermissions(){
    return this.http.get('/api/user/user/permissions').map(data=>{
      let userdata = data.json();
      return userdata.results.data.permissions?userdata.results.data.permissions:[];
    })
  }
}
