import {Injectable} from '@angular/core';
import {InterceptorService} from "ng2-interceptors/index";

@Injectable()
export class CustomerSearchService{
  constructor(
    private http: InterceptorService
  ){}

  getcustomer(key?:string, page?:number){
    return this.http.get('/api/customer/customer'+'?keyword='+key+'&page='+page).map(data=>{
      return data.json();
    })
  }
}
