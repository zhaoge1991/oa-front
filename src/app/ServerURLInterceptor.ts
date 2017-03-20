import { Interceptor, InterceptedRequest, InterceptedResponse,InterceptorService  } from 'ng2-interceptors';
import { Headers, RequestOptions } from '@angular/http';
import {MessageService} from "services/core/messageComponent.service";

/**
 * 自定义拦截器配置
 */
//请求链接基地址
const bacsUrl = 'http://192.168.1.142/crm/oa/public';
export class ServerURLInterceptor implements Interceptor {
  private token;

  // 对请求做更改，获取请求信息或者编辑
  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    let user = localStorage.getItem('currentUser');
    if(user){
      this.token = JSON.parse(user).access_token;
    }

    //为所有请求加上基地址
    request.options.url = bacsUrl + request.options.url;

    //请求类型method，0为get，1为post，2为put，3为delete
    let method = request.options.method;

    if(method === 0){
      if(request.options.url.indexOf('?')>0){
        request.options.url += '&access_token=' +  this.token;
      } else {
        request.options.url += '?access_token=' +  this.token;
      }
    }
    if(method === 1){
      console.log(request);
      request.options.body.access_token = this.token;

    }
    if(method === 2){
      request.options.body.access_token = this.token;
      console.log(request);
    }
    if(method === 3){
      console.log(request);
      request.options.body = {access_token: this.token};

    }

    return request;
  }

  // 对响应做更改，获取响应信息或者编辑
  public interceptAfter(response: InterceptedResponse): InterceptedResponse {

    if(response.response.status === 401){
      window.location.href = '#/login';
    } else if(response.response.status === 404){
      alert('请求错误')
    } else if(response.response.status === 200){
      //this.messageservice.putMessage({
      //
      //})
    }
    return response;
    /*
     可以返回:
     - Response: 修改后的响应
     - Nothing: 与Request一样
     */
  }
}
