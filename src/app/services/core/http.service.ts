import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response, ConnectionBackend, Http, Request, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MessageService} from '../core/message.service';
@Injectable()
export class CustomHttp extends Http {
    private token: string;
    private baseUrl: string;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private router: Router, messageService: MessageService) {
        super(backend, defaultOptions);
        let user = localStorage.getItem('currentUser');
        if (user) {
            this.token = JSON.parse(user).access_token;
        }
        this.baseUrl = 'http://192.168.1.142/crm/oa/public';
        console.log(messageService.test());

    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('request...');
        return super.request(url, options).map(res => {
            console.log('返回结果');
            console.log('http code：' + res.status);
            return res;
        }).catch(res => {
            console.log('错误处理');
            console.log('错误代码：'+res.status);
            if (res.status == 200) {

            } else if (res.status == 400) {

            } else if (res.status == 401) {
                console.log('401错误处理:重定向');
                this.router.navigate(['/login']);
            }

            return res;



        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {

        let real_url = this.baseUrl + url;

        let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded'});
        options = {headers: headers}
        if (real_url.indexOf('?') > 0) {
            real_url += '&access_token=' + 'TvKbIUVrllqaCzac7dbEKVTlL4as3rmD13ygSwXh';
        } else {
            real_url += '?access_token=' + 'TvKbIUVrllqaCzac7dbEKVTlL4as3rmD13ygSwXh';
        }

        return super.get(real_url, options).map(res => res.json());
    }


}
