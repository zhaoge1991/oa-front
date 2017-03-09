import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class DegreeService {
  constructor(private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'Degree','degree_id','getDegree')
  }

}
