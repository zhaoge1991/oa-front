import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {Location} from '@angular/common';
import {MessageService} from "../../core/messageComponent.service";
import {CurentUserService} from "../../core/currentuser.service";
import {AppconfigService} from "../../core/appConfigService/appConfigService";

@Injectable()
export class OpinionService {
  constructor(private http:HttpInterceptorService,
              private messageservice:MessageService,
              private location:Location,
              private currentuserservice:CurentUserService,
              private appconfigservice:AppconfigService) {
  }

  //获取需求列表
  getOpinionList(page: number){
    return this.http.get('/api/work/information/opinion' + '?page=' + page).map(data=> {
        if(data.status == 200){
          return data.json().results.data.opinions;
        }
      }
    )
  }

  //通过id获取需求
  getOpinion(id: number){
    return this.http.get('/api/work/information/opinion/' + id).map(data=> {
        if(data.status == 200){
          return data.json().results.data.opinion;
        }
      }
    )
  }

  //删除需求
  deleteOpinion(id:number){
    return this.http.delete('/api/work/information/opinion/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除需求成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //修改需求
  putOpinion(id:number, body){
    return this.http.put('/api/work/information/opinion/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新需求成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新需求失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增需求
  postOpinion(body){
    return this.http.post('/api/work/information/opinion', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建需求成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建需求失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //评论需求
  putComment(body,id){
    return this.http.post('/api/work/information/opinion/'+id+'/comment', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '评论成功',
          detail: '需求评论成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '评论失败',
          detail: '需求评论失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //回复评论
  putReplay(body){
    return this.http.post('/api/work/information/opinion/comment/reply', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '回复成功',
          detail: '回复成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '回复失败',
          detail: '回复失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

}
