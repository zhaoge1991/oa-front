import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {GetService} from "../../../common/function/getfunction";
import {MessageService} from "../messageComponent.service";
import {Location} from '@angular/common';

@Injectable()
export class ZoneService {
  constructor(
    private getservice: GetService,
    private http:HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location
  ){}

  get(id?: number){
    return this.getservice.get(id,'Zone','zone_id','getZone')
  }

  getObs(){
    return this.getservice.getObs(null,'Zone','zone_id','getZone')
  }


  //修改地区
  put(id:number, body) {
    return this.http.put('/api/localisation/zone/'+ id , body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新地区信息成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Zone');
        this.getObs().subscribe(()=>{
          this.location.back();
        })
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新地区信息失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增地区
  post(body) {
    return this.http.post('/api/localisation/zone', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建地区成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Zone');
        this.get();
        this.location.back();this.getObs().subscribe(()=>{
          this.location.back();
        })
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建地区失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //删除地区
  delete(id:number) {
    return this.http.delete('/api/localisation/zone/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除地区成功',
          severity: 'success',
          life: 3000
        });
        sessionStorage.removeItem('Zone');
        this.get();
      }
      return res;
    })
  }

}
