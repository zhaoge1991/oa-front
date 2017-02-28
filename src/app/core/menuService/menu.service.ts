import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import {GetService} from "../../common/function/getfunction";

@Injectable()
export class MenuService {
  constructor(private http: InterceptorService,private getservice: GetService){}

  get(id: number){
    //TODO 获取所有菜单
  }

}
