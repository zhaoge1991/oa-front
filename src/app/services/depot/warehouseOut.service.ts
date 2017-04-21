import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpInterceptorService} from "../../services/interceptor"
import {WarehouseOut} from "../../models/depot/warehouseOut"

@Injectable()
export class WarehouseOutService {
    constructor(private http: HttpInterceptorService) {}
    getList(page?: number) {
        return this.http.get('/api/depot/inventory/out' + '?page=' + page).map(res => {
            return res.json().results.data.out_orders;
        });
    }

    getDetail(id: number): Observable<WarehouseOut> {
        return this.http.get('/api/depot/inventory/out/' + id).map(res => {
            return res.json().results.data.out_order as WarehouseOut;
        })
    }
    add(warehouseOut: WarehouseOut) {
        return this.http.post('/api/depot/inventory/out', warehouseOut).map(res => {
            return res.json();
        });
    }

    edit(id: number, warehouseOut: WarehouseOut) {
        return this.http.put('/api/depot/inventory/out/' + id, warehouseOut).map(res => {
            return res.json();
        });
    }

    delete(warehouseOut: WarehouseOut) {
        return this.http.delete('/api/depot/inventory/out/' + warehouseOut.warehouse_out_id).map(res => {
            return res.json();
        })
    }
}
