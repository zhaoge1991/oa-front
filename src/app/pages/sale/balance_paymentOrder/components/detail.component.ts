import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {Location} from '@angular/common';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {OrderService} from "../../../../services/order/order.service";
import {baseUrl} from "../../../../services/interceptor";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";


@Component({
  selector:'sale-detai-component',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: OrderService,
    private appconfig: AppconfigService
  ){
    this.commonActionBarConfig.addNewUrl = 'pages/sale/order/edit';
    this.commonActionBarConfig.idName = 'order_id';
    this.commonActionBarConfig.editUrl = 'pages/sale/order/edit';
    this.commonActionBarConfig.isSaleOrder = true;
    this.commonActionBarConfig.annex = true;
    this.commonActionBarConfig.canEexport = true;
    this.commonActionBarConfig.paymentTip = true;
  }
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;
  private isdone: boolean;
  private ordertype: number;
  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
    this.orderservice.get(id).subscribe(data=>{
      //判断是否已完成
      this.isdone = (data.order_status_id===this.appconfig.get('sale.order.status.complete'))? true:false;
      //判断订单是否为免费样品单
      if(data.order_type_id == this.appconfig.get('sale.order.type.free')){
        this.ordertype = 0; //免费样品单为0
      } else {
        this.ordertype = 1; //其他单为1
      };
      this.data = data;
    })
  }

  download(id:number){
    window.location.href = baseUrl+'/api/common/annex/download/'+id+'?access_token='+JSON.parse(localStorage.getItem('currentUser')).access_token
  }

}


