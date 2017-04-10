import {Component,OnInit,ViewChild,OnChanges,DoCheck} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable';

import {OrderEditModel} from "../../../../common/models/order_edit.model";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {AlertService} from "../../../../services/core/alert.component.service";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {AgGridMultiLineComponent} from "../../../../modules/agGrid/common/agGridMultiLine.component";
import {AgGridCurrencyComponent} from "../../../../modules/agGrid/common/agGridCurrency.component";
import {TableOrderCost} from "../../../../models/sale/table/TableOrderCost";
import {TableOrderProduct} from "../../../../models/sale/table/TableOrderProduct";
import {ProvisionService} from "../../../../services/core/provisionService/provision.service";
import {TableContract} from "../../../../models/sale/table/TableContract";
import {CustomersService} from "../../../../services/customer/customers.service";
import {Customer} from "../../../../models/customer/customer";

@Component({
  selector: 'sale-order-edit',
  templateUrl: './edit.html',
  styleUrls: []
})

export class EditComponent implements OnInit,DoCheck{

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private olddata: any;
  private data: Customer;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: CustomersService,
    private payment: PaymentService,
    private provision: ProvisionService,
    private appconfig: AppconfigService,
    private quantifier: QuantifierService,
    private location: Location,
    private alertservice: AlertService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.addNewUrl = 'pages/customer/customers/edit';
    this.commonActionBarConfig.saveUrl = 'pages/customer/customers/edit';
    this.commonActionBarConfig.idName = 'customer_id';
  }

  ngDoCheck(){
    if(this.data){
      if(this.olddata.users!==this.data.users){
        this.getUsersName();
      }
    }
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    });
    this.setData();
  }

  setData(){
    if(this.id){
      this.orderservice.get(this.id).subscribe(data=>{

        this.data = new Customer(data);

        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

      })
    } else {
      this.data = new Customer(null);

      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));

    }
  }

  usersName: string = ''; //所有用户名字符串
  getUsersName(){
    this.usersName = '';
    let users = this.data.users;
    if(users){
      if(users&&users.length) {
        for (let i = 0; i < users.length; i++) {
          if (users.length <= 1) {
            this.usersName += users[i].name
          } else {
            this.usersName += users[i].name + '、'
          }
        }
      }
    }
  }

  //保存
  save(){
    if(this.isEdit){
      this.orderservice.put(this.id,this.data).subscribe();
    } else {
      this.orderservice.post(this.data).subscribe();
    }
    this.olddata = this.data;
  }

  //编辑守卫
  canDeactivate(): boolean|Observable<boolean>{
    if(JSON.stringify(this.olddata) == JSON.stringify(this.data)){
      return true;
    } else {
      return this.alertservice.putMessage({
        title: '提示弹窗',
        detail: '单据已修改，确认放弃修改并退出吗？',
        severity: 'warn'
      })
    }
  }

}


