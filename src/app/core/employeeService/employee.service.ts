import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class EmployeeService {
  constructor(private http: InterceptorService){}

  private employees;

  getemployees(): Observable {
    if (this.employees) {
      return Observable.of(this.employees);
    } else {
      return this.http.get('/api/organization/employee').map(
        (response:Response)=> {
          if (response.json()) {
            this.employees = response;
            return response;
          }
        }
      )
    }
  }

}
