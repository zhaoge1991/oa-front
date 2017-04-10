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

  //获取单个产品
  get(id:number){
    return this.http.get('/api/product/products/'+id).map(data=>{
      if(data.status == 200){
        return data.json().results.data.product;
      }
    })
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
}
