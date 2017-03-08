import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {CustomHttp} from '../core/http.service';

@Injectable()
export class OrderService {
    constructor(private http: CustomHttp) {}
    getOrders(page?: number) {
        return this.http.get('/api/sale/order/order' + '?page=' + page).map(this.extractData).catch(this.handleError);
    }

    getSchedules(id: string) {
        return this.http.get('/api/sale/order/order/' + id + '/order_schedule').toPromise().then(res => {
            return res.json();
        });
    }

    getOrder(id: number) {
        return this.http.get('/api/sale/order/order/' + id).map(res => {
            return res.json().results.data.order;
        })
    }

    delete(id: number) {
        let token = JSON.parse(localStorage.getItem('currentUser')).access_token;
        let body = 'access_token=' + token;
        let options = new RequestOptions({body: body});
        return this.http.delete('/api/sale/order/order/' + id, options).map(res => {
            return res.json();
        })
    }

    getwenjian(id: number) {
        return this.http.get('/api/common/annex/download/' + id).map(res => {
            return res;
        })
    }
    private handleError(error: Response | any) {
        console.log('错误处理');
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData(res: Response) {
        
        console.log(res);
        
        let body = res.json();
        return body.data || {};
    }

}
