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

}
