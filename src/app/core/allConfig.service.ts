/**
 * 获取所有配置，将配置数据转换为配置对象供其他数据调用
 */
import {Injectable} from '@angular/core';
import { InterceptorService } from 'ng2-interceptors';
import { Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class AllConfigService{
  constructor(private http: InterceptorService){}

  /**
   * 获取配置公共方法（无法修改传入的config参数，空了再考虑这一方案）
   * @param config  配置项
   * @param url  获取配置的url
   * @param idname  配置id的name
   * @returns {any} 返回配置对象
     */
  //getconfig(config:any,url:string,idname:string){
  //  if (config) {
  //    return config;
  //  } else {
  //    return this.http.get(url).map(
  //      (response:Response)=> {
  //        if (response.json()) {
  //          let obj = {};
  //          for(var i=0;i<response.json().length;i++){
  //            obj[response.json()[i][idname]] = response.json()[i];
  //          }
  //          config = obj;
  //          console.log(666,this.currencys);
  //          return config;
  //        }
  //      }
  //    ).subscribe(data=>config)
  //  }
  //}

  //全局配置接口
  /**TODO
   *
   */

  //国家接口
  private countries;
  getCountry(){
    if (this.countries) {
      return this.countries;
    } else {
      return this.http.get("/api/localisation/country").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            for(var i=0;i<response.json().length;i++){
              obj[response.json()[i].country_id] = response.json()[i];
            }
            this.countries = obj;
            return this.countries;
          }
        }
      ).subscribe(data=>this.countries)
    }
  }

  //货币接口
  private currencies;
  getCurrency(){
    if (this.currencies) {
      //return Observable.of(this.currencys);
      return this.currencies;
    } else {
      return this.http.get("/api/localisation/currency").map(
        (response:Response)=> {
          if (response.json()) {
            let Currencys = {};
            for(var i=0;i<response.json().length;i++){
              Currencys[response.json()[i].currency_id] = response.json()[i];
            }
            this.currencies = Currencys;
            return this.currencies;
          }
        }
      ).subscribe(data=>{this.currencies})
    }
    //this.getconfig(this.currencys,'/api/localisation/currency','currency_id')
  }

  //语言接口
  private languages;
  getLanguage(){
    if (this.languages) {
      return this.languages;
    } else {
      return this.http.get("/api/localisation/currency").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            for(var i=0;i<response.json().length;i++){
              obj[response.json()[i].language_id] = response.json()[i];
            }
            this.languages = obj;
            return this.languages;
          }
        }
      ).subscribe(data=>this.languages)
    }
  }

  //数量词接口
  private quantifiers
  getQuantifiers(){
    if (this.quantifiers) {
      return this.quantifiers;
    } else {
      return this.http.get("/api/localisation/quantifier").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            for(var i=0;i<response.json().length;i++){
              obj[response.json()[i].quantifier_id] = response.json()[i];
            }
            this.quantifiers = obj;
            return this.quantifiers;
          }
        }
      ).subscribe(data=>this.quantifiers)
    }
  }

  //地区接口
  private zones
  getZone(){
    if (this.zones) {
      return this.zones;
    } else {
      return this.http.get("/api/localisation/zone").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            for(var i=0;i<response.json().length;i++){
              obj[response.json()[i].zone_id] = response.json()[i];
            }
            this.zones = obj;
            return this.zones;
          }
        }
      ).subscribe(data=>this.zones)
    }
  }

  //菜单接口
  private menus
  getMenu(){
    if (this.menus) {
      return this.menus;
    } else {
      return this.http.get("/api/menu/menu").map(
        (response:Response)=> {
          if (response.json()) {
            this.menus = response.json();
            return this.menus;
          }
        }
      ).subscribe(data=>this.menus)
    }
  }

  //职员学位接口
  private degrees
  getDegree(){
    if (this.degrees) {
      return this.degrees;
    } else {
      return this.http.get("/api/organization/degree").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.degrees;
            for(var i=0;i<data.length;i++){
              obj[data[i].degree_id] = data[i];
            }
            this.degrees = obj;
            return this.degrees;
          }
        }
      ).subscribe(data=>this.degrees)
    }
  }

  //部门接口
  private departments
  getDepartment(){
    if (this.departments) {
      return this.departments;
    } else {
      return this.http.get("/api/organization/department").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.departments;
            for(var i=0;i<data.length;i++){
              obj[data[i].department_id] = data[i];
            }
            this.departments = obj;
            return this.departments;
          }
        }
      ).subscribe(data=>this.departments)
    }
  }

  //职位接口
  private positions
  getPosition(){
    if (this.positions) {
      return this.positions;
    } else {
      return this.http.get("/api/organization/position").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.positions;
            for(var i=0;i<data.length;i++){
              obj[data[i].position_id] = data[i];
            }
            this.positions = obj;
            return this.positions;
          }
        }
      ).subscribe(data=>this.positions)
    }
  }

  //采购需求方接口
  private demanders
  getDemander(){
    if (this.demanders) {
      return this.demanders;
    } else {
      return this.http.get("/api/procurement/demander").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.demanders;
            for(var i=0;i<data.length;i++){
              obj[data[i].procurement_demander_id] = data[i];
            }
            this.demanders = obj;
            return this.demanders;
          }
        }
      ).subscribe(data=>this.demanders)
    }
  }

  //采购供应商程度接口
  private supplier_degrees
  getSupplier_degree(){
    if (this.supplier_degrees) {
      return this.supplier_degrees;
    } else {
      return this.http.get("/api/procurement/supplier_degree").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.supplier_degree;
            for(var i=0;i<data.length;i++){
              obj[data[i].supplier_degree_id] = data[i];
            }
            this.supplier_degrees = obj;
            return this.supplier_degrees;
          }
        }
      ).subscribe(data=>this.supplier_degrees)
    }
  }

  //采购供应商等级接口
  private supplier_levels
  getSupplier_level(){
    if (this.supplier_levels) {
      return this.supplier_levels;
    } else {
      return this.http.get("/api/procurement/supplier_level").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.supplier_level;
            for(var i=0;i<data.length;i++){
              obj[data[i].supplier_level_id] = data[i];
            }
            this.supplier_levels = obj;
            return this.supplier_levels;
          }
        }
      ).subscribe(data=>this.supplier_levels)
    }
  }

  //采购供应商评分接口
  private supplier_ratings
  getSupplier_rating(){
    if (this.supplier_ratings) {
      return this.supplier_ratings;
    } else {
      return this.http.get("/api/procurement/supplier_rating").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.supplier_rating;
            for(var i=0;i<data.length;i++){
              obj[data[i].supplier_rating_id] = data[i];
            }
            this.supplier_ratings = obj;
            return this.supplier_ratings;
          }
        }
      ).subscribe(data=>this.supplier_ratings)
    }
  }

  //采购供应商状态接口
  private supplier_statuses
  getSupplier_status(){
    if (this.supplier_statuses) {
      return this.supplier_statuses;
    } else {
      return this.http.get("/api/procurement/supplier_status").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.supplier_status;
            for(var i=0;i<data.length;i++){
              obj[data[i].supplier_status_id] = data[i];
            }
            this.supplier_statuses = obj;
            return this.supplier_statuses;
          }
        }
      ).subscribe(data=>this.supplier_statuses)
    }
  }

  //销售支付方式接口
  private payments
  getPayment(){
    if (this.payments) {
      return this.payments;
    } else {
      return this.http.get("/api/sale/info/payment").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.payments;
            for(var i=0;i<data.length;i++){
              obj[data[i].payment_id] = data[i];
            }
            this.payments = obj;
            return this.payments;
          }
        }
      ).subscribe(data=>this.payments)
    }
  }

  //销售价格条款接口
  private provisions
  getProvision(){
    if (this.provisions) {
      return this.provisions;
    } else {
      return this.http.get("/api/sale/info/provision").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.provisions;
            for(var i=0;i<data.length;i++){
              obj[data[i].provision_id] = data[i];
            }
            this.provisions = obj;
            return this.provisions;
          }
        }
      ).subscribe(data=>this.provisions)
    }
  }

  //货运方式接口
  private transports
  getTransport(){
    if (this.transports) {
      return this.transports;
    } else {
      return this.http.get("/api/sale/info/transport").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.transports;
            for(var i=0;i<data.length;i++){
              obj[data[i].transport_id] = data[i];
            }
            this.transports = obj;
            return this.transports;
          }
        }
      ).subscribe(data=>this.transports)
    }
  }

  //订单来源接口
  private sources
  getSource(){
    if (this.sources) {
      return this.sources;
    } else {
      return this.http.get("/api/sale/order/source").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.sources;
            for(var i=0;i<data.length;i++){
              obj[data[i].order_source_id] = data[i];
            }
            this.sources = obj;
            return this.sources;
          }
        }
      ).subscribe(data=>this.sources)
    }
  }

  //订单状态接口
  private statuses
  getStatus(){
    if (this.statuses) {
      return this.statuses;
    } else {
      return this.http.get("/api/sale/order/status").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.statuses;
            for(var i=0;i<data.length;i++){
              obj[data[i].order_status_id] = data[i];
            }
            this.statuses = obj;
            return this.statuses;
          }
        }
      ).subscribe(data=>this.statuses)
    }
  }

  //数据密码类型接口
  private password_types
  getPassword_type(){
    if (this.password_types) {
      return this.password_types;
    } else {
      return this.http.get("/api/data/password/type").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.password_types;
            for(var i=0;i<data.length;i++){
              obj[data[i].password_type_id] = data[i];
            }
            this.password_types = obj;
            return this.password_types;
          }
        }
      ).subscribe(data=>this.password_types)
    }
  }

  //需求管理时间类型接口
  private opinion_dates
  getOpinion_dates(){
    if (this.opinion_dates) {
      return this.opinion_dates;
    } else {
      return this.http.get("/api/work/information/opinion_date").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.opinion_dates;
            for(var i=0;i<data.length;i++){
              obj[data[i].opinion_date_id] = data[i];
            }
            this.opinion_dates = obj;
            return this.opinion_dates;
          }
        }
      ).subscribe(data=>this.opinion_dates)
    }
  }

  //需求管理类型接口
  private opinion_types
  getOpinion_type(){
    if (this.opinion_types) {
      return this.opinion_types;
    } else {
      return this.http.get("/api/work/information/opinion_type").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.opinion_types;
            for(var i=0;i<data.length;i++){
              obj[data[i].opinion_type_id] = data[i];
            }
            this.opinion_types = obj;
            return this.opinion_types;
          }
        }
      ).subscribe(data=>this.opinion_types)
    }
  }

  //月报平分等级接口
  private month_rankings
  getMonth_rankings(){
    if (this.month_rankings) {
      return this.month_rankings;
    } else {
      return this.http.get("/api/work/report/month_ranking").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.month_rankings;
            for(var i=0;i<data.length;i++){
              obj[data[i].report_month_ranking_id] = data[i];
            }
            this.month_rankings = obj;
            return this.month_rankings;
          }
        }
      ).subscribe(data=>this.month_rankings)
    }
  }

  //事项等级接口
  private task_levels
  getTask_levels(){
    if (this.task_levels) {
      return this.task_levels;
    } else {
      return this.http.get("/api/work/task/level").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.task_levels;
            for(var i=0;i<data.length;i++){
              obj[data[i].task_level_id] = data[i];
            }
            this.task_levels = obj;
            return this.task_levels;
          }
        }
      ).subscribe(data=>this.task_levels)
    }
  }

  //事项状态接口
  private task_statuses
  getTask_statuses(){
    if (this.task_statuses) {
      return this.task_statuses;
    } else {
      return this.http.get("/api/work/task/status").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.task_statuses;
            for(var i=0;i<data.length;i++){
              obj[data[i].task_status_id] = data[i];
            }
            this.task_statuses = obj;
            return this.task_statuses;
          }
        }
      ).subscribe(data=>this.task_statuses)
    }
  }

  //事项类型接口
  private task_types
  getTask_types(){
    if (this.task_types) {
      return this.task_types;
    } else {
      return this.http.get("/api/work/task/type").map(
        (response:Response)=> {
          if (response.json()) {
            let obj = {};
            let data = response.json().results.data.task_types;
            for(var i=0;i<data.length;i++){
              obj[data[i].task_type_id] = data[i];
            }
            this.task_types = obj;
            return this.task_types;
          }
        }
      ).subscribe(data=>this.task_types)
    }
  }
}
