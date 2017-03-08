import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import {AppconfigService} from "../../coreService/appConfigService/appConfigService";


@Injectable()
export class ProductCatalogService {
  constructor(private http: InterceptorService,private appconfigservice: AppconfigService){}
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

}
