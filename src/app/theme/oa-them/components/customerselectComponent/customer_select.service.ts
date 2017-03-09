import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../../../services/interceptor";

@Injectable()
export class CustomerSearchService{
  constructor(
    private http: HttpInterceptorService
  ){}

  getcustomer(key?:string, page?:number){
    return this.http.get('/api/customer/customer'+'?keyword='+key+'&page='+page).map(data=>{
      return data.json();
    })
  }
}
