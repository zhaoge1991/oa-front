import {Injectable} from '@angular/core';
import {HttpInterceptorService} from "../../interceptor";
import {Location} from '@angular/common';
import {MessageService} from "../../core/messageComponent.service";


@Injectable()
export class TaskService{
  constructor(private http: HttpInterceptorService,private messageservice:MessageService,private location:Location){}

  getTasks(page:number){
    return this.http.get('/api/work/task/task' + '?page=' + page).map(res=> {
        return res.json();
      }
    )
  }

  //获取单个产品
  get(id:number){
    return this.http.get('/api/product/products/'+id).map(data=>{
      if(data.status == 200){
        return data.json().results.data.product;
      }
    })
  }

  //修改
  put(id:number, body){
    return this.http.put('/api/product/products/' + id, body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '更新成功',
          detail: '更新产品成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '更新失败',
          detail: '更新产品失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  //新增
  post(body){
    return this.http.post('/api/product/products', body).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '新建成功',
          detail: '新建产品成功',
          severity: 'success',
          life: 3000
        });
        this.location.back();
      } else {
        this.messageservice.putMessage({
          summary: '新建失败',
          detail: '新建产品失败',
          severity: 'error',
          life: 3000
        })
      }
      return res.json();
    });
  }

  delete(id:number){
    return this.http.delete('/api/product/products/' + id).map(res=> {
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '成功',
          detail: '删除产品成功',
          severity: 'success',
          life: 3000
        });
      }
      return res;
    })
  }
}
