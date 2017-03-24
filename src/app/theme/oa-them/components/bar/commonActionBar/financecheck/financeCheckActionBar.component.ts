import {Component, Input,EventEmitter,Output,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/index";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {FinanceService} from "../../../../../../services/finance/finance.service";
@Component({
  selector: 'bar-common-action-bar-financeCheck',
  templateUrl: './financeCheckActionBar.component.html',
  providers: [FinanceService]
})

export class FinanceCheckActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();
  constructor(private appconfig: AppconfigService,private financeservice:FinanceService) {}

  //审核按钮
  private isrefuse: boolean = false;
  private reason: string;
  private payment_fee: string;
  private price: string;
  @ViewChild('checkdialog') checkModal: ModalDirective;
  chowcheck(){
    this.checkModal.show();
  }
  checkChange(check:boolean){
    this.isrefuse = !check;
  }

  //审核订单
  checkorder(){
    let result = !this.isrefuse;
    let reason = this.reason;
    let price = this.price;
    let payment_fee = this.payment_fee;
    let body;
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
    this.financeservice.check(body).subscribe(()=>{
      this.checkModal.hide();
      this.objectChange.emit(this.object);
    });
  }

}
