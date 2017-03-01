import {Injectable} from '@angular/core';
import {ConnectionBackend,XHRConnection,XHRBackend,Request} from '@angular/http';
import {HttpInterceptor} from './http-interceptor';

@Injectable()
export class HttpInterceptorBackend implements ConnectionBackend{
  constructor(private _httpInterceptor:HttpInterceptor,private _xhrBackend:XHRBackend){}

  createConnection(request: Request): XHRConnection{
    let interceptor = this._httpInterceptor;

    //在请求发出前，拦截请求并调用HttpInterceptor对象的beforeRequest方法进行处理
    let req = interceptor.beforeRequest?interceptor.beforeRequest(request):request;

    //通过XHRBackend对象创建XHRConnection实例
    let result = this._xhrBackend.createConnection(req);

    //在得到响应后，拦截并调用HttpInterceptor对象的afterResponse方法进行处理
    result.response = interceptor.afterResponse?interceptor.afterResponse(result.response):result.response;

    return result;
  }
}
