import {Injectable} from '@angular/core';
import {AllConfigService} from "../../services/core/allConfig.service";

@Injectable()
export class GetService {
  constructor(private configservice: AllConfigService){}

  get(id?:number,sessname?:string,idname?:string,funname?:string){
    let session = sessionStorage.getItem(sessname);
    if(!session) {
      this.configservice[funname]().subscribe(data => {
        sessionStorage.setItem(sessname,JSON.stringify(data));
        if(id){
          for(var i=0;i<data.length;i++){
            if(id == data[i][idname]){
              return data[i];
            }
          }
        } else {return data};
      });
    }else {
      let data = JSON.parse(session);
      if(id){
        for(var i=0;i<data.length;i++){
          if(id == data[i][idname]){
            return data[i];
          }
        }
      } else {return JSON.parse(session)};
    }
  }

  getObs(id?,sessname?:string,idname?:string,funname?:string){
    return this.configservice[funname]().map(data => {
      sessionStorage.setItem(sessname,JSON.stringify(data));
      if(id){
        for(var i=0;i<data.length;i++){
          if(id == data[i][idname]){
            return data[i];
          }
        }
      } else {return data};
    });
  }

}
