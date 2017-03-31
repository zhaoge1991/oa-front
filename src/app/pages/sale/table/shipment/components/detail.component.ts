import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {Location} from '@angular/common';
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";
import {baseUrl} from "../../../../../services/interceptor";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {ContractService} from "../../../../../services/contract/contract.service";
import {ShipmentService} from "../../../../../services/shipment/shipment.service";

@Component({
  selector:'sale-detai-component',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private orderservice: ShipmentService,
    private appconfig: AppconfigService
  ){
    this.commonActionBarConfig.idName = 'id';
    this.commonActionBarConfig.addNewUrl = 'pages/sale/table/shipment/edit';
    this.commonActionBarConfig.editUrl = 'pages/sale/table/shipment/edit';
    this.commonActionBarConfig.canEexport = {pdf:true};
  }
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
    this.orderservice.get(id).subscribe(data=>{
      this.data = data;
    })
  }

}


