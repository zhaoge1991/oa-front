import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response, ConnectionBackend, Http, Request, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {MessageService} from "./core/messageComponent.service";
import {PreloaderService} from "./core/preloaderComponent.service";

export const baseUrl = 'http://192.168.1.142/crm/oa/public';

@Injectable()
export class HttpInterceptorService extends Http {
  private token: string;
  private baseUrl: string;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private router: Router, private messageservice: MessageService,private preloaderservice: PreloaderService) {
    super(backend, defaultOptions);

    this.baseUrl = baseUrl;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log(url);
    return super.request(url, options).map(res => {
      //console.log('返回结果');
      //console.log('http code：' + res.status);
      this.preloaderservice.putToggle(false);
      return res;
    }).catch(res => {
      console.log('错误处理',res);
      console.log('错误代码：'+res.status);
      this.messageservice.putMessage({
        summary: '请求失败',
        detail: '请重试，错误代码：'+res.statusText,
        severity: 'error'
      })
      if (res.status == 200) {

      } else if (res.status == 400) {
        this.messageservice.putMessage({
          summary: '请求失败',
          detail: '请重试，错误代码：'+res.status,
          severity: 'error'
        })
      } else if (res.status == 404) {
        this.messageservice.putMessage({
          summary: '请求失败',
          detail: '请重试，错误代码：'+res.status,
          severity: 'error'
        })
      } else if (res.status == 401) {
        console.log('401错误处理:重定向');
        this.router.navigate(['/login']);
      }
      return res;
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if(!this.token){
      let user = localStorage.getItem('currentUser');
      if(user){
        this.token = JSON.parse(user).access_token;
      }
    }

    let real_url = this.baseUrl + url;

    if (real_url.indexOf('?') > 0) {
      real_url += '&access_token=' + this.token;
    } else {
      real_url += '?access_token=' + this.token;
    }

    this.preloaderservice.putToggle(true);
    return super.get(real_url, options).map(res => res);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if(!this.token){
      let user = localStorage.getItem('currentUser');
      if(user){
        this.token = JSON.parse(user).access_token;
      }
    }

    let real_url = this.baseUrl + url;

    if(!options){
      options = new RequestOptions({});
    }
    if(options.body){
      options.body.access_token =  this.token;
    } else {
      options.body = {access_token: this.token}
    }

    this.preloaderservice.putToggle(true);
    return super.delete(real_url, options).map(res => res);
  }

  put(url: string, body:any,options?: RequestOptionsArgs): Observable<Response> {
    if(!this.token){
      let user = localStorage.getItem('currentUser');
      if(user){
        this.token = JSON.parse(user).access_token;
      }
    }

    let real_url = this.baseUrl + url;
    body.access_token =  this.token;

    this.preloaderservice.putToggle(true);
    return super.put(real_url, body,options).map(res => res);
  }

  post(url: string, body:any,options?: RequestOptionsArgs): Observable<Response> {
    if(!this.token){
      let user = localStorage.getItem('currentUser');
      if(user){
        this.token = JSON.parse(user).access_token;
      }
    }

    let real_url = this.baseUrl + url;

    if(body){
      body.access_token =  this.token;
    } else {
      body = {access_token: this.token}
    }

    this.preloaderservice.putToggle(true);
    return super.post(real_url, body,options).map(res => res);
  }

}
