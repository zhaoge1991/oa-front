import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class DemanderService {
  constructor(private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'Demander','procurement_demander_id','getDemander')
  }

}
