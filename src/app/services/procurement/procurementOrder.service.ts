import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {ProcurementOrder} from "../../models/procurement/procurementOrder"
import {HttpInterceptorService} from "../../services/interceptor"
@Injectable()
export class ProcurementOrderService {
    constructor(private http: HttpInterceptorService) {}
    getList(page?: number) {
        return this.http.get('/api/procurement/procurement_order' + '?page=' + page).toPromise().then(res => {
            return res.json().results.data.procurement_orders;
        });
    }

    getDetail(id: number): Observable<ProcurementOrder> {
        return this.http.get('/api/procurement/procurement_order/' + id).map(res => {
            return res.json().results.data.procurement_order as ProcurementOrder;
        })
    }
    add(procurementOrder: ProcurementOrder) {
        return this.http.post('/api/procurement/procurement_order', procurementOrder).map(res => {
            return res.json();
        });
    }

    edit(id: number, procurementOrder: ProcurementOrder) {
        return this.http.put('/api/procurement/procurement_order/' + id, procurementOrder).map(res => {
            return res.json();
        });
    }

    delete(procurementOrder: ProcurementOrder) {
        let options = new RequestOptions();
        return this.http.delete('/api/procurement/procurement_order/' + procurementOrder.procurement_order_id,options).map(res => {
            return res.json();
        })
    }

    updateStatusProcessing(procurementOrder: ProcurementOrder) {
        return this.http.post('/api/procurement/procurement_order/processing_do', {procurement_order_ids: [procurementOrder.procurement_order_id]}).map(res => {
            return res.json();
        });
    }

}
