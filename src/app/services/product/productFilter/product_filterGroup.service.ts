import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class ProductFilterGroupService{
  constructor(private http:HttpInterceptorService){}

  getlist(){
    return this.http.get('/api/product/filter_group_catalog').map(res=>{
      if(res.status == 200){
        return res.json().results.data.filter_group_catalogs
      }
    })
  }
}
