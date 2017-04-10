import {Injectable} from '@angular/core';
import {URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {HttpInterceptorService} from "../../services/interceptor"
import {ProcurementDemander} from "../../models/procurement/procurementDemander"

@Injectable()
export class ProcurementDemanderService {
    constructor(private http: HttpInterceptorService) {}
    getList(page?: number) {
        
        return this.http.get('/api/procurement/demander' + '?page=' + page).map(res => {
            return res.json().results.data.demanders;
        });
    }

    getDetail(id: number): Observable<ProcurementDemander> {
        return this.http.get('/api/procurement/demander/' + id).map(res => {
            return res.json().results.data.demander as ProcurementDemander;
        })
    }
    add(procurementDemander: ProcurementDemander) {
        return this.http.post('/api/procurement/demander', procurementDemander).map(res => {
            return res.json();
        });
    }

    edit(id: number, procurementDemander: ProcurementDemander) {
        return this.http.put('/api/procurement/demander/' + id, procurementDemander).map(res => {
            return res.json();
        });
    }

    delete(procurementDemander: ProcurementDemander) {
        return this.http.delete('/api/procurement/demander/' + procurementDemander.procurement_demander_id).map(res => {
            return res.json();
        })
    }
}
