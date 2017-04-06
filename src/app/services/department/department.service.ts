import {Injectable} from '@angular/core';
import {AppconfigService} from "../core/appConfigService/appConfigService";
import {HttpInterceptorService} from "../interceptor";


@Injectable()
export class DepartmentService {
  constructor(private http: HttpInterceptorService,private appconfigservice: AppconfigService){}
  get(){
    return this.http.get('/api/organization/department').map(data=>{
      if(data.json()){
        return data.json().results.data.departments;
      }
    })
  }

  //生成列表树
  getdataTrre(data,arr){
    let index = 0;
    for(let i in data){
      arr.push({
        id: data[i].department_id,
        name: data[i].name,
        children: []
      });
      if(data[i].items){
        this.getdataTrre(data[i].items,arr[index].children)
      }
      index++;
    }
  }

}
