import {Component, Input,EventEmitter,Output,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/index";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {FinanceService} from "../../../../../../services/finance/finance.service";
@Component({
  selector: 'bar-common-action-bar-finance',
  templateUrl: './financeActionBar.component.html',
  providers: [FinanceService]
})

export class FinanceActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();
  constructor(private appconfig: AppconfigService,private financeservice:FinanceService) {}

  //到款录入按钮
  private isrefuse: boolean = false;
  private reason: string;
  private payment_fee: string;
  private price: string;
  @ViewChild('checkdialog') checkModal: ModalDirective;
  showcheck(){
    this.checkModal.show();
  }
  checkChange(check:boolean){
    this.isrefuse = !check;
  }

  //到款录入
  checkorder(){
    let result = !this.isrefuse;
    let reason = this.reason;
    let price = this.price;
    let payment_fee = this.payment_fee;
    let body;
    //欠尾款录入
    if(this.config.isFinance == 'payment'){
      if(result){
        body = {
          order_id: this.object.order_id,
          price: price,
          payment_fee: payment_fee
        }
      } else {
        if(this.object.order_type_id == this.appconfig.get('sale.order.type.full')){
          body = {
            order_id: this.object.order_id,
            reason: reason,
            update_status: this.appconfig.get('sale.order.status.waitpayment')
          };
        } else {
          body = {
            order_id: this.object.order_id,
            reason: reason,
            update_status: this.appconfig.get('sale.order.status.supervisorcheckcomplate')
          };
        }
      }
      this.financeservice.price(body).subscribe(()=>{
        this.checkModal.hide();
        this.objectChange.emit(this.object);
      });
    }
    //欠运费录入
    if(this.config.isFinance == 'transport'){
      if(result){
        body = {
          order_id: this.object.order_id,
          payment_fee: price
        }
      } else {
        if(this.object.order_type_id == this.appconfig.get('sale.order.type.full')){
          body = {
            order_id: this.object.order_id,
            reason: reason,
            update_status: this.appconfig.get('sale.order.status.waitpayment')
          };
        } else {
          body = {
            order_id: this.object.order_id,
            reason: reason,
            update_status: this.appconfig.get('sale.order.status.supervisorcheckcomplate')
          };
        }
      }
      this.financeservice.tanceportPrice(body).subscribe(()=>{
        this.checkModal.hide();
        this.objectChange.emit(this.object);
      });
    }
  }

  //提醒催款按钮
  @ViewChild('tipdialog') tipModal: ModalDirective;
  private message: string;
  showTip(){
    this.tipModal.show();
  }

  putTip(){
    if(this.message){
      let message = {message: this.message}
      this.financeservice.putTip(this.object.order_id,message).subscribe(()=>{
        this.tipModal.hide();
      })
    }
  }
}
