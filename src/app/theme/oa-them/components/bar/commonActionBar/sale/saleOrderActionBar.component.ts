import {Component, Input,Output,EventEmitter,OnChanges,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import {Order} from "../../../../../../models/sale/order/Order";
import {SaleActionBarService} from "./sale.actionBar.service";
import {ModalDirective} from "ng2-bootstrap/index";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";

@Component({
  selector: 'bar-common-action-bar-sale-order',
  templateUrl: './saleaction.component.html',
  providers: [SaleActionBarService]
})

export class SaleOrderActionBarComponent implements OnChanges{
  @Input() config: any;
  @Input() object: Order;
  @Output() objectChange = new EventEmitter<Order>();
  private operat: any;
  private dialogtext: {text:string,operat: any,data?:any} = {text:'请主管审核', operat: ''};
  constructor(
    private router: Router,
    private location:Location,
    private saleactionbarservice: SaleActionBarService,
    private appconfig: AppconfigService
  ) {}

  ngOnChanges(){
    if(this.object){
      this.operat = this.saleactionbarservice.getOperat(this.object);
    }
  }

  //生成出运安排
  toshipclick(){
    this.saleactionbarservice.toship(this.object[this.config.idName]).subscribe()
  }
  //生成订单要求
  orderdemandclick(){
    this.saleactionbarservice.orderdemand(this.object[this.config.idName]).subscribe()
  }

  //请主管审核
  @ViewChild('textdialog') textModal: ModalDirective;
  supauditclick(){
    this.dialogtext = {
      text:'请主管审核',
      operat: 'supauditEmit'
    };
    this.textModal.show();
  }
  supauditEmit($event){
    if($event){
      let body = {
        order_id: this.object[this.config.idName],
        update_status: this.appconfig.get('sale.order.status.waitsupervisorcheck')
      }
      this.saleactionbarservice.supaudit(body).subscribe();
    }
    this.textModal.hide();
  }

  //请财务审核
  financeauditclick(){
    this.dialogtext = {
      text:'请财务审核',
      operat: 'financeauditEmit'
    };
    this.textModal.show();
  }
  financeauditEmit($event){
    if($event){
      let body = {
        order_id: this.object[this.config.idName],
        update_status: this.appconfig.get('sale.order.status.waitfinancecheck')
      }
      this.saleactionbarservice.financeaudit(body).subscribe();
    }
    this.textModal.hide();
  }

  //请采购审核
  procurementauditclick(){
    this.dialogtext = {
      text:'请采购审核',
      operat: 'procurementauditEmit'
    };
    this.textModal.show();
  }
  procurementauditEmit($event){
    if($event){
      let body = {
        order_id: this.object[this.config.idName],
        update_status: this.appconfig.get('sale.order.status.waitprocurementcheck')
      }
      this.saleactionbarservice.procurementaudit(body).subscribe();
    }
    this.textModal.hide();
  }

  //请货运发货
  toshipmentclick(){
    this.dialogtext = {
      text:'请货运发货',
      operat: 'toshipmentEmit'
    };
    this.textModal.show();
  }
  toshipmentEmit($event){
    if($event){
      let body = {
        order_id: this.object[this.config.idName],
        update_status: this.appconfig.get('sale.order.status.waitshipped')
      }
      this.saleactionbarservice.toshipment(body).subscribe();
    }
    this.textModal.hide();
  }

  //客户已收货
  cusreciveclick(){
    this.dialogtext = {
      text:'客户已收货',
      operat: 'cusreciveEmit'
    };
    this.textModal.show();
  }
  cusreciveEmit($event){
    if($event){
      let body = {
        order_id: this.object[this.config.idName],
        update_status: this.appconfig.get('sale.order.status.customerreceived')
      }
      this.saleactionbarservice.cusrecive(body).subscribe();
    }
    this.textModal.hide();
  }

  //已完成
  isdoneclick(){
    this.dialogtext = {
      text:'已完成',
      operat: 'isdoneEmit'
    };
    this.textModal.show();
  }
  isdoneEmit($event){
    if($event){
      let body = {
        order_id: this.object[this.config.idName],
        update_status: this.appconfig.get('sale.order.status.complete')
      }
      this.saleactionbarservice.isdone(body).subscribe();
    }
    this.textModal.hide();
  }

  //请采购核销
  procurementcheckclick(){
    this.dialogtext = {
      text:'请采购核销',
      operat: 'procurementcheckEmit',
      data: {
        result: null,
        description: null
      }
    };
    this.textModal.show();
  }
  procurementcheckEmit(){
    let body = {
      order_id: this.object[this.config.idName],
      update_status: this.appconfig.get('sale.order.status.waitprocurementverification'),
      result: this.dialogtext.data.result,
      test_description: this.dialogtext.data.description
    }
    this.saleactionbarservice.procurementcheck(body).subscribe();
    this.textModal.hide();
  }
  //processing() {
  //  this.procurementOrderService.updateStatusProcessing(this.object).subscribe(data => {
  //    this.object.status = 1
  //    this.objectChange.emit(this.object);
  //  })
  //  ;
  //}


}
