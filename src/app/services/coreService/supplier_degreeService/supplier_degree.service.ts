import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class SupplierDegreeService {
  constructor(private http: InterceptorService,private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'SupplierDegree','supplier_degree_id','getSupplier_degree')
  }

}
