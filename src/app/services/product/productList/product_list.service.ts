import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";


@Injectable()
export class ProductListService{
  constructor(private http: HttpInterceptorService){}

  get(key:string,page:number,catalog: number){
    console.log(key,page,catalog);
    if(key){
      return this.http.get('/api/product/products'+'?filter_name='+key+'&page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
    } else if(catalog){
      return this.http.get('/api/product/products'+'?catalog_id='+catalog+'&page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
    } else {
      return this.http.get('/api/product/products'+'?page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
    }
  }
}
