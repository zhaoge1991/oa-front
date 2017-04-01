import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {baseUrl} from "../../../../services/interceptor";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {ContractService} from "../../../../services/contract/contract.service";
import {CustomersService} from "../../../../services/customer/customers.service";


@Component({
  selector:'sale-detai-component',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private orderservice: CustomersService
  ){
    this.commonActionBarConfig.idName = 'customer_id';
    this.commonActionBarConfig.addNewUrl = 'pages/customer/customers/edit';
    this.commonActionBarConfig.editUrl = 'pages/customer/customers/edit';
    this.commonActionBarConfig.deleteUrl = 'pages/customer/customers/edit';
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

  deleteData(e){
    if(e){
      this.orderservice.delete(this.data.customer_id).subscribe(data=>{
        this.location.back();
      })
    }
  }
}


