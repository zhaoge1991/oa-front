import {RequestOptions,Http} from '@angular/http';
import {HttpInterceptorBackend} from './http-interceptor-backend';
import { InterceptorService } from 'ng2-interceptors';

export function httpFactory(httpInterceptorBackend: HttpInterceptorBackend,requestOptions: RequestOptions):Http{
  return new InterceptorService(httpInterceptorBackend,requestOptions);
}
