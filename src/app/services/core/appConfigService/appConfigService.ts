import {Injectable} from '@angular/core';
import { Response} from '@angular/http';
import {AllConfigService} from "../allConfig.service";
import {HttpInterceptorService} from "../../interceptor";
import {MessageService} from "../messageComponent.service";
import {Location} from '@angular/common';

@Injectable()
export class AppconfigService {
  constructor(
    private configservice: AllConfigService,
    private http:HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location
  ){}

  get(per?:string){
    //return this.getservice.get(per,'Appconfig','','getAppconfig');
    let session = sessionStorage.getItem('appconfig');
    if(!session) {
      this.configservice.getAppconfig().subscribe(data => {
        sessionStorage.setItem('appconfig',JSON.stringify(data));
        return per?data[per]:data;
      });
    }else {
      let data = JSON.parse(session);
      return per?data[per]:data;
    }
  }
  getObs(per?:string){
    return this.configservice.getAppconfig().map(data => {
      sessionStorage.setItem('appconfig',JSON.stringify(data));
      return per?data[per]:data;
    });
  }


  //修改配置
  put(body) {
    return this.http.post('/api/localisation/config',body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新配置成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('appconfig');
        this.getObs().subscribe(()=>{
          this.location.back();
        })
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新配置信息失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
