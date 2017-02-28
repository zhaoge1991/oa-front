import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {Location} from '@angular/common';
import {OrderManagerService} from "../../../../ordermanager.service";
import {AppconfigService} from "../../../../../../core/appConfigService/appConfigService";

@Component({
  selector:'',
  template: require('./order-detail.html'),
  styles: [require('./order-detail.scss')]
})

export class OrderDetailComponent implements OnInit,OnDestroy{
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: OrderManagerService,
    private appconfig: AppconfigService
  ){}

  private id:number;
  private data: {};
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

  private actionConfig={
    showbtn:{add:true,edit:true,action:true,export:true,annex:true,delete:true,close:true},
    openurl: 'pages/sale/order-manager/detail',
    addurl: 'pages/sale/order-manager/edit',
    idname: 'order_id'
  };

  getById(id:number){
    this.orderservice.getOrderById(id).subscribe(data=>{
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
    this.orderservice.getwenjian(id).subscribe();
  }
}


