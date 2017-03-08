import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import {GetService} from "../../../common/function/getfunction";

@Injectable()
export class LanguageService {
  constructor(private http: InterceptorService,private getservice: GetService){}

  private currences;

  get(id?: number){
    return this.getservice.get(id,'Language','language_id','getLanguage')
  }

}
