import {Injectable} from '@angular/core';
import {Request,Response,Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MessageService} from "../core/messageComponent.service";

const bacsUrl = 'http://192.168.1.142/crm/oa/public';

@Injectable()
export class HttpInterceptor{
  private token:string;

  constructor(private message: MessageService,private router:Router){}

  //请求发出前的处理逻辑
  beforeRequest(request: Request):Request{
    if(!this.token){
      let user = localStorage.getItem('currentUser');
      if(user){
        this.token = JSON.parse(user).access_token;
      }
    }

    //加上基地址
    request.url = bacsUrl + request.url;

    //请求类型method，0为get，1为post，2为put，3为delete
    let method = request.method;

    if(method === 0){
      if(request.url.indexOf('?')>0){
        request.url += '&access_token=' +  this.token;
      } else {
        request.url += '?access_token=' +  this.token;
      }
    }
    if(method === 3){
      request.headers = new Headers({'Content-type':'application/x-www-form-urlencoded'})
    }
    return request;
  }

  afterResponse(res: Observable<Response>): Observable<any>{
    //请求响应后的处理逻辑
    res.subscribe(data=>{
      if(data.status == 200){
        this.message.putMessage({
          severity: 'success',
          summary: '请求成功',
          detail: data.statusText,
          life: 4500
        })
      } else if (data.status == 400){
        this.message.putMessage({
          severity: 'error',
          summary: '请求失败',
          detail: data.statusText
        })
      } else if (data.status == 401){
        this.router.navigate(['/login']);
      }
    })
    return res;
  }
}
