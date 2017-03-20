import {Injectable} from '@angular/core';
import {GetService} from "../../../common/function/getfunction";
import {HttpInterceptorService} from "../../interceptor";

@Injectable()
export class MenuService {
  constructor(private http: HttpInterceptorService,private getservice: GetService){}

  get(id: number){
    //TODO 获取所有菜单
  }

}
