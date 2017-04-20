import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {Location} from '@angular/common';
import {MessageService} from "../../core/messageComponent.service";
import {CurentUserService} from "../../core/currentuser.service";
import {AppconfigService} from "../../core/appConfigService/appConfigService";

@Injectable()
export class AnnouncementService {
  constructor(private http:HttpInterceptorService,
              private messageservice:MessageService,
              private location:Location
  ) {}

  //获取需求列表
  getAnnouncementList(page: number){
    return this.http.get('/api/work/information/announcement' + '?page=' + page).map(data=> {
        if(data.status == 200){
          return data.json().results.data.announcements;
        }
      }
    )
  }

  //通过id获取需求
  getAnnouncement(id: number){
    return this.http.get('/api/work/information/announcement/' + id).map(data=> {
        if(data.status == 200){
          return data.json().results.data.announcement;
        }
      }
    )
  }

  //删除需求
  deleteAnnouncement(id:number){
    return this.http.delete('/api/work/information/announcement/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除公告成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //修改需求
  putAnnouncement(id:number, body){
    return this.http.put('/api/work/information/announcement/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新公告成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新公告失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增需求
  postAnnouncement(body){
    return this.http.post('/api/work/information/announcement', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建公告成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建公告失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //评论需求
  putComment(body,id){
    return this.http.post('/api/work/information/announcement/'+id+'/comment', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '评论成功',
          detail: '公告评论成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '评论失败',
          detail: '公告评论失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //回复评论
  putReplay(body){
    return this.http.post('/api/work/information/announcement/comment/reply', body).map(res=> {
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
