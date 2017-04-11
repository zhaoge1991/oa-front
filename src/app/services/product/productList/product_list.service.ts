import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {MessageService} from "../../core/messageComponent.service";


@Injectable()
export class ProductListService{
  constructor(private http: HttpInterceptorService,private messageservice:MessageService){}

  getlist(key:string, page:number, catalog: number){
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

  delete(id:number){
    return this.http.delete('/api/product/products/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除产品成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }
  
  getWarningList(page:number){
      return this.http.get('/api/depot/inventory/warning'+'?page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
  }
  
  getDailiaoList(page:number){
      return this.http.get('/api/depot/inventory/dailiao'+'?page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
  }
  
  getTurnoverList(page:number){
      return this.http.get('/api/depot/inventory/turnover'+'?page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
  }
  
  getInventoryList(page:number){
      return this.http.get('/api/depot/inventory/inventory'+'?page='+page).map(data=>{
        if(data.json()){
          return data.json().results.data.products
        }
      })
  }
  
  
}
