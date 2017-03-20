import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../../../services/interceptor";
import {MessageService} from "../../../../services/core/messageComponent.service";
import {RequestOptions,Response,Headers} from '@angular/http';
import { saveAs } from 'file-saver';

@Injectable()
export class AnneexesService {
  constructor(private http: HttpInterceptorService,private messageservice: MessageService){}
  upload(data:any,id?:number){
    let fileList: FileList = data;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('filedata', file);
      formData.append('access_token', JSON.parse(localStorage.getItem('currentUser')).access_token);
      return this.http.post('/api/sale/order/order/'+id+'/up_img',formData).map(res=>{
        if(res.status == 200){
          let data = res.json().results.data.annex;
          this.messageservice.putMessage({
            summary: '上传成功',
            detail: '文件:'+data.name+'上传成功',
            severity: 'success',
            life: 3000
          });
          return data;
        }
      });
    }
  }

  delete(id:number){
    let options = new RequestOptions({});
    return this.http.delete('/api/common/annex/'+id,options).map(res=>{
      if(res.status == 200){
        let data = res.json();
        this.messageservice.putMessage({
          summary: '删除成功',
          detail: '文件删除成功',
          severity: 'success',
          life: 3000
        });
        return data;
      }
    })
  }

}
