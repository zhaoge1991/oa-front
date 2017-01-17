import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class AllProjectService {
  constructor(private http: InterceptorService){}

  private projects;

  getprojects(): Observable {
    if (this.projects) {
      return Observable.of(this.projects);
    } else {
      return this.http.get('/api/group/project').map(
        (response:Response)=> {
          if (response.json()) {
            this.projects = response;
            return response;
          }
        }
      )
    }
  }

}
