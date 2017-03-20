import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {HttpInterceptorService} from "../../services/interceptor"
import {ProcurementSupplier} from "../../models/procurement/procurementSupplier"

@Injectable()
export class ProcurementSupplierService {
    constructor(private http: HttpInterceptorService) {}
    getList(page?: number) {
        
        return this.http.get('/api/procurement/supplier' + '?page=' + page).map(res => {
            return res.json().results.data.supplier;
        });
    }

    getDetail(id: number): Observable<ProcurementSupplier> {
        return this.http.get('/api/procurement/supplier/' + id).map(res => {
            return res.json().results.data.supplier as ProcurementSupplier;
        })
    }
    add(procurementSupplier: ProcurementSupplier) {
        return this.http.put('/api/procurement/supplier', procurementSupplier).map(res => {
            return res.json();
        });
    }

    edit(id: number, procurementSupplier: ProcurementSupplier) {
        return this.http.post('/api/procurement/supplier/' + id, procurementSupplier).map(res => {
            return res.json();
        });
    }

    delete(id: number) {
        return this.http.delete('/api/procurement/supplier/' + id).map(res => {
            return res.json();
        })
    }
}
