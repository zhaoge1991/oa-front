import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {HttpInterceptorService} from "../../services/interceptor"
import {WarehouseEnter} from "../../models/depot/warehouseEnter"

@Injectable()
export class WarehouseEnterService {
    constructor(private http: HttpInterceptorService) {}
    getList(page?: number) {
        return this.http.get('/api/depot/inventory/enter' + '?page=' + page).map(res => {
            return res.json().results.data.enter_orders;
        });
    }

    getDetail(id: number): Observable<WarehouseEnter> {
        return this.http.get('/api/depot/inventory/enter/' + id).map(res => {
            return res.json().results.data.en_order as WarehouseEnter;
        })
    }
    add(warehouseEnter: WarehouseEnter) {
        return this.http.post('/api/depot/inventory/enter', warehouseEnter).map(res => {
            return res.json();
        });
    }

    edit(id: number, warehouseEnter: WarehouseEnter) {
        return this.http.put('/api/depot/inventory/enter/' + id, warehouseEnter).map(res => {
            return res.json();
        });
    }

    delete(warehouseEnter: WarehouseEnter) {
        return this.http.delete('/api/depot/inventory/enter/' + warehouseEnter.warehouse_enter_id).map(res => {
            return res.json();
        })
    }
}
