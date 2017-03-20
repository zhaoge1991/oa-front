import {Injectable} from '@angular/core';
import { Response} from '@angular/http';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class DepartmentService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  private departments;

  get(id?: number){
    return this.getservice.get(id,'Department','department_id','getDepartment')
  }


  adddepartment(name: string){
    return this.http.post('/api/organization/department',{name: name}).map(
      (res: Response)=>{
        if(res.status == 200){
          this.departments = '';
          //this.getdepartments().subscribe();
          return res;
        }
      }
    )
  }

  delete(id: number){
    return this.http.delete('/api/organization/department/'+id,{body:{department_id: id}}).map(
      (res: Response)=>{
        if(res.status == 200){
          this.departments = '';
          //this.getdepartments().subscribe();
          return res;
        }
      }
    )
  }

}
