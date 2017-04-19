import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {Location} from '@angular/common';
import {MessageService} from "../../core/messageComponent.service";
import {CurentUserService} from "../../core/currentuser.service";
import {AppconfigService} from "../../core/appConfigService/appConfigService";


@Injectable()
export class ReportService{
  constructor(
    private http: HttpInterceptorService,
    private messageservice:MessageService,
    private location:Location,
    private currentuserservice: CurentUserService,
    private appconfigservice: AppconfigService
  ){}

  //获取周报列表
  getReportWeeks(page:number){
    return this.http.get('/api/work/report/week' + '?page=' + page).map(data=> {
      if(data.status == 200){
        return data.json().results.data.reports;
      }
      }
    )
  }
  //获取月报列表
  getReportMonths(page:number){
    return this.http.get('/api/work/report/month' + '?page=' + page).map(data=> {
        if(data.status == 200){
          return data.json().results.data.reports;
        }
      }
    )
  }

  //通过id获取周报数据
  getReportWeekById(id:number){
    return this.http.get('/api/work/report/week/' + id).map(data=> {
        if(data.status == 200){
          return data.json().results.data;
        }
      }
    )
  }
  //通过id获取月报数据
  getReportMonthById(id:number){
    return this.http.get('/api/work/report/month/' + id).map(data=> {
        if(data.status == 200){
          return data.json().results.data;
        }
      }
    )
  }

  //修改周报
  putweek(id:number, body){
    return this.http.put('/api/work/report/week/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新周报成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新周报失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }
  //修改月报
  putmonth(id:number, body){
    return this.http.put('/api/work/report/month/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新月报成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新月报失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增周报
  postweek(body){
    return this.http.post('/api/work/report/week', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建周报成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建周报失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }
  //新增月报
  postmonth(body){
    return this.http.post('/api/work/report/month', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建月报成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建月报失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //删除周报
  deleteweek(id:number){
    return this.http.delete('/api/work/report/week/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除周报成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }
  //删除月报
  deletemonth(id:number){
    return this.http.delete('/api/work/report/month/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除月报成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //评论周报&月报
  postComment(body,reportid:number,type:string){
    return this.http.post('/api/work/report/'+type+'/'+reportid+'/comment', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '评论成功',
          detail: '评论成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '评论失败',
          detail: '评论失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //月报评分
  monthRanking(body,reportid:number){
    return this.http.post('/api/work/report/month/'+reportid+'/ranking', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '评分成功',
          detail: '月报评分成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '评论失败',
          detail: '月报评分失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //获取是否为销售用户
  isSaleRoles(){
    return this.currentuserservice.getRoles().map((data)=>{
      let saleId = this.appconfigservice.get('user.role.sale');
      return data.some(role=>{
        return (role.id == saleId) ? true: false;
      })
    })
  }

  //获取周报工作项
  getWork(date?){
    if(date){
      return this.http.get('/api/work/report/week/getwork?report_time='+date).map(data=>{
        if(data.status == 200){
          return data.json().results.data;
        }
      })
    } else {
      return this.http.get('/api/work/report/week/getwork').map(data=>{
        if(data.status == 200){
          return data.json().results.data;
        }
      })
    }

  }
  //获取月报工作项
  getWorkMonth(date?){
    if(date){
      return this.http.get('/api/work/report/month/getwork?report_time='+date).map(data=>{
        if(data.status == 200){
          return data.json().results.data;
        }
      })
    } else {
      return this.http.get('/api/work/report/month/getwork').map(data=>{
        if(data.status == 200){
          return data.json().results.data;
        }
      })
    }

  }

}
