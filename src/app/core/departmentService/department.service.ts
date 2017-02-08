import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class DepartmentService {
  constructor(private http: InterceptorService){}

  private departments;

  getdepartments(){
    if (this.departments) {
      return Observable.of(this.departments);
    } else {
      return this.http.get('/api/organization/department').map(
        (response:Response)=> {
          if (response.json()) {
            this.departments = response;
            return response;
          }
        }
      )
    }
  }

  adddepartment(name: string){
    return this.http.post('/api/organization/department',{name: name}).map(
      (res: Response)=>{
        if(res.status == 200){
          this.departments = '';
          this.getdepartments().subscribe();
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
          this.getdepartments().subscribe();
          return res;
        }
      }
    )
  }

}
