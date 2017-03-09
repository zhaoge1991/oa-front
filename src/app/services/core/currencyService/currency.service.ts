import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class CurrencyService {
  constructor(private getservice: GetService){}

  get(id?: number){
    return this.getservice.get(id,'Currency','currency_id','getCurrency')
  }

}
