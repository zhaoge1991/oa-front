import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {InterceptorService} from 'ng2-interceptors';
import {ProcurementSupplier} from "../../models/procurement/procurementSupplier"

@Injectable()
export class ProcurementSupplierService {
    constructor(private http: InterceptorService) {}
    getList(page?: number) {
        
        return this.http.get('/api/procurement/supplier' + '?page=' + page).map(res => {
            return res.json().results.data.supplier;
        });
    }

    getDetail(id: number): Observable<ProcurementSupplier> {
        return this.http.get('/api/procurement/procurement_order/' + id).map(res => {
            return res.json().results.data.procurement_supplier as ProcurementSupplier;
        })
    }
    add(procurementSupplier: ProcurementSupplier) {
        return this.http.put('/api/procurement/procurement_order', procurementSupplier).map(res => {
            return res.json();
        });
    }

    edit(id: number, procurementOrder: ProcurementSupplier) {
        return this.http.post('/api/procurement/procurement_order/' + id, procurementOrder).map(res => {
            return res.json();
        });
    }

    delete(id: number) {
        return this.http.delete('/api/procurement/procurement_order/' + id).map(res => {
            return res.json();
        })
    }
}
