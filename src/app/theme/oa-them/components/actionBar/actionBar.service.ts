import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../../../services/interceptor";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActionBarService{
  constructor(private http: HttpInterceptorService){}

  toship(id: number){
    this.http.post('/api/sale/order/order/to_shipment',id).map(data=>{
      console.log(data);
    })
  }
}
