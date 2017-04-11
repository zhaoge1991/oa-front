/**
 * 获取所有配置，将配置数据转换为配置对象供其他数据调用
 */
import {Injectable} from '@angular/core';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {HttpInterceptorService} from "../interceptor";

@Injectable()
export class AllConfigService{
  constructor(private http: HttpInterceptorService){}

  /**
   * 获取配置公共方法
   * @param url 获取配置的url
   * @param name 配置id的name
   * @returns {any} 配置数据
     */
  get(url:string,name?:string){
    return this.http.get(url).map(res=>{
      let data = res.json();
      if(data.results){
        return data.results.data[name];
      } else return data;
    })
  }

  //全局配置接口
  getAppconfig(){
    return this.get('/api/localisation/config');
  }

  //国家接口
  getCountry(){
    return this.get('/api/localisation/country');
  }

  //集团项目接口
  getProject(){
    return this.get('/api/group/project');
  }

  //货币接口
  getCurrency(){
    return this.get('/api/localisation/currency');
  }

  //语言接口
  getLanguage(){
    return this.get('/api/localisation/language');
  }

  //数量词接口
  getQuantifiers(){
    return this.get('/api/localisation/quantifier');
  }

  //地区接口
  getZone(){
    return this.get('/api/localisation/zone');
  }

  //菜单接口
  getMenu(){
    return this.get('/api/menu/menu');
  }

  //职员学位接口
  getDegree(){
    return this.get('/api/organization/degree','degrees');
  }

  //部门接口
  getDepartment(){
    return this.get('/api/organization/department','departments');
  }

  //职位接口
  getPosition(){
    return this.get('/api/organization/position','positions');
  }

  //采购需求方接口
  getDemander(){
    return this.get('/api/procurement/demander','demanders');
  }

  //采购供应商程度接口
  getSupplier_degree(){
    return this.get('/api/procurement/supplier_degree','supplier_degree');
  }

  //采购供应商等级接口
  getSupplier_level(){
    return this.get('/api/procurement/supplier_level','supplier_level');
  }

  //采购供应商评分接口
  getSupplier_rating(){
    return this.get('/api/procurement/supplier_rating','supplier_rating');
  }

  //采购供应商状态接口
  getSupplier_status(){
    return this.get('/api/procurement/supplier_status','supplier_status');
  }

  //销售支付方式接口
  getPayment(){
    return this.get('/api/sale/info/payment','payments');
  }

  //销售价格条款接口
  getProvision(){
    return this.get('/api/sale/info/provision','provisions');
  }

  //货运方式接口
  getTransport(){
    return this.get('/api/sale/info/transport','transports');
  }

  //订单来源接口
  getSource(){
    return this.get('/api/sale/order/source','sources');
  }

  //订单状态接口
  getStatus(){
    return this.get('/api/sale/order/status','statuses');
  }

  //数据密码类型接口
  getPassword_type(){
    return this.get('/api/data/password/type','password_types');
  }

  //需求管理时间类型接口
  getOpinion_dates(){
    return this.get('/api/work/information/opinion_date','opinion_dates');
  }

  //需求管理类型接口
  getOpinion_type(){
    return this.get('/api/work/information/opinion_type','opinion_types');
  }

  //月报平分等级接口
  getMonth_rankings(){
    return this.get('/api/work/report/month_ranking','month_rankings');
  }

  //事项等级接口
  getTask_levels(){
    return this.get('/api/work/task/level','task_levels');
  }

  //事项状态接口
  getTask_statuses(){
    return this.get('/api/work/task/status','task_statuses');
  }

  //事项类型接口
  getTask_types(){
    return this.get('/api/work/task/type','task_types');
  }

  //权限管理接口
  getPermission(){
    return this.get('/api/user/permission','permissions');
  }

  //角色管理接口
  getRole(){
    return this.get('/api/user/role','roles');
  }

  //订单类型接口
  getOrder_type(){
    return this.get('/api/sale/order/type','types');
  }
}
