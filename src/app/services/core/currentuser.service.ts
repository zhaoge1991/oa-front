import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../interceptor";

@Injectable()
export class CurentUserService{
  constructor(private http: HttpInterceptorService){}

  getuser(){
    return this.http.get('/api/user/user/current').map(data=>{
      let userdata = data.json();
      return userdata.results.data.user?userdata.results.data.user:{}
    })
  }
}
