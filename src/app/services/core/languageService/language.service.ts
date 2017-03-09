import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class LanguageService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  private currences;

  get(id?: number){
    return this.getservice.get(id,'Language','language_id','getLanguage')
  }

}
