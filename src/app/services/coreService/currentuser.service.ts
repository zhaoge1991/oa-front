import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()
export class CurentUserService{
  constructor(private http: InterceptorService){}

  getuser(){
    return this.http.get('/api/user/user/current').map(data=>{
      let userdata = data.json();
      return userdata.results.data.user?userdata.results.data.user:{}
    })
  }
}
