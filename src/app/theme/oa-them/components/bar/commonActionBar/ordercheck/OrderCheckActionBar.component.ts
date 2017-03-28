import {Component, Input,EventEmitter,Output,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/index";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {SaleDirectorService} from "../../../../../../services/directorOrder/sale-director.service";
@Component({
  selector: 'bar-common-action-bar-orderCheck',
  templateUrl: './orderCheckActionBar.component.html',
  providers: [SaleDirectorService]
})

export class OrderCheckActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();
  constructor(private appconfig: AppconfigService,private directorservice:SaleDirectorService) {}

  //审核按钮
  private isrefuse: boolean = null;
  private reason: string;
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
    let reson = this.reason;
    let body;
    if(result){
      body = {
        order_id: this.object.order_id,
        update_status: this.appconfig.get('sale.order.status.supervisorcheckcomplate')
      }
    } else {
      body = {
        order_id: this.object.order_id,
        update_status: this.appconfig.get('sale.order.status.waitpayment')
      }
    }
    this.directorservice.check(body).subscribe(()=>{
      this.checkModal.hide();
      this.objectChange.emit(this.object);
    });
  }

}
