import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {FreezeOrder} from "../../models/procurement/freezeOrder"
import {HttpInterceptorService} from "../../services/interceptor"
@Injectable()
export class FreezeOrderService {
    constructor(private http: HttpInterceptorService) {}
    getList(page?: number) {
        return this.http.get('/api/procurement/freeze' + '?page=' + page).toPromise().then(res => {
            return res.json().results.data.freezes;
        });
    }

    getDetail(id: number): Observable<FreezeOrder> {
        return this.http.get('/api/procurement/freeze/' + id).map(res => {
            return res.json().results.data.freeze as FreezeOrder;
        })
    }
    add(freezeOrder: FreezeOrder) {
        return this.http.post('/api/procurement/freeze', freezeOrder).map(res => {
            return res.json();
        });
    }

    edit(id: number, freezeOrder: FreezeOrder) {
        return this.http.put('/api/procurement/freeze/' + id, freezeOrder).map(res => {
            return res.json();
        });
    }

    delete(freezeOrder: FreezeOrder) {
        let options = new RequestOptions();
        return this.http.delete('/api/procurement/freeze/' + freezeOrder.procurement_freeze_id,options).map(res => {
            return res.json();
        })
    }


}
