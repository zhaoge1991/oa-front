import {Injectable} from '@angular/core';
import {AppconfigService} from "../../core/appConfigService/appConfigService";
import {Location} from '@angular/common';
import {HttpInterceptorService} from "../../interceptor";
import {MessageService} from "../../core/messageComponent.service";


@Injectable()
export class ProductCatalogService {
  constructor(
    private http: HttpInterceptorService,
    private appconfigservice: AppconfigService,
    private messageservice:MessageService,
    private location:Location
  ){}
  get(){
    return this.http.get('/api/product/catalog').map(data=>{
      if(data.json()){
        return data.json().results.data.catalogs
      }
    })
  }

  //获取列表树
  getdataTrre(data,arr){
    let index = 0;
    for(let i in data){
      arr.push({
        id: data[i].catalog_id,
        name: this.getname(data[i].catalog_description),
        children: []
      });
      if(data[i].items){
        this.getdataTrre(data[i].items,arr[index].children)
      }
      index++;
    }
  }

  //获取列表名字
  getname(namearr){
    if(namearr.length>0){
      for(let i=0;i<namearr.length;i++){
        if(namearr[i].language_id == this.appconfigservice.get('localisation.language.default')){
          return namearr[i].name;
        }
      }
    } else return ''
  }

  //删除分类
  delete(id:number){
    return this.http.delete('/api/product/catalog/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除分类成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //获取分类
  getcatalog(id:number){
    return this.http.get('/api/product/catalog/'+id).map(data=>{
      if(data.status == 200){
        return data.json().results.data.catalog;
      }
    })
  }

  //修改分类
  put(id:number, body){
    return this.http.put('/api/product/catalog/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新产品分类成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新产品分类失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增分类
  post(body){
    return this.http.post('/api/product/catalog', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建产品分类成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建产品分类失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
