import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {InterceptorService} from 'ng2-interceptors';
import {ProcurementOrder} from "../../models/procurement/procurementOrder"

@Injectable()
export class ProcurementOrderService {
    constructor(private http: InterceptorService) {}
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
        return this.http.put('/api/procurement/procurement_order', procurementOrder).map(res => {
            return res.json();
        });
    }

    edit(id: number, procurementOrder: ProcurementOrder) {
        return this.http.post('/api/procurement/procurement_order/' + id, procurementOrder).map(res => {
            return res.json();
        });
    }

    delete(id: number) {
        return this.http.delete('/api/procurement/procurement_order/' + id).map(res => {
            return res.json();
        })
    }

    updateStatusProcessing(procurementOrder: ProcurementOrder) {
        
        console.log(22222);
        return this.http.post('/api/procurement/procurement_order/processing_do', JSON.stringify({procurement_orders: [procurementOrder.procurement_order_id]})).map(res => {
            return res.json();
        });
    }

}
