import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {Location} from '@angular/common';
import {MessageService} from "../../core/messageComponent.service";


@Injectable()
export class TaskService{
  constructor(private http: HttpInterceptorService,private messageservice:MessageService,private location:Location){}

  getTasks(page:number){
    return this.http.get('/api/work/task/task' + '?page=' + page).map(data=> {
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
      }
    )
  }

  //获取我指派的事项
  getMySourceTasks(page:number){
    return this.http.get('/api/work/task/task/my_source_task' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //获取我发起的事项
  getMyTasks(page:number){
    return this.http.get('/api/work/task/task/my_task' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //获取抄送我的事项
  getCcTasks(page:number){
    return this.http.get('/api/work/task/task/cc' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //获取完成事项
  getCompleteTasks(page:number){
    return this.http.get('/api/work/task/task/complete' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //获取管理事项
  getTaskManagers(page:number){
    return this.http.get('/api/work/task/task_manager' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //获取管理事项中我的事项
  getMySourceTaskMangers(page:number){
    return this.http.get('/api/work/task/task_manager/my_source_task' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //获取管理事项中完成事项
  getCompleteTaskMangers(page:number){
    return this.http.get('/api/work/task/task_manager/complete' + '?page=' + page).map(data=>{
      if(data.status == 200){
        return data.json().results.data.tasks;
      }
    })
  }

  //通过id获取事项
  getById(id:number){
    return this.http.get('/api/work/task/task/' + id).map(data=> {
        if(data.status == 200){
          return data.json().results.data.task;
        }
      }
    )
  }

  //修改
  put(id:number, body){
    return this.http.put('/api/work/task/task/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新事项成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新事项失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增
  post(body){
    return this.http.post('/api/work/task/task', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建事项成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建事项失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  delete(id:number){
    return this.http.delete('/api/work/task/task/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除事项成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }

  //跟新事项进度
  postProgress(body){
    return this.http.post('/api/work/task/task/'+body.task_id+'/status', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新事项成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新事项失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }
}
