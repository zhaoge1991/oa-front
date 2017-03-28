import {Component, Input,EventEmitter,Output,ViewChild,OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/index";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {ShippingService} from "../../../../../../services/shipping/shipping.service";

@Component({
  selector: 'bar-common-action-bar-shipping',
  templateUrl: './shippingActionBar.component.html',
  providers: [ShippingService]
})

export class ShippingActionBarComponent implements OnChanges {
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();

  constructor(private appconfig:AppconfigService, private route:Router, private shippingservice:ShippingService) {
  }

  ngOnChanges() {
    if (this.object) {
      this.getStatus()
    }
  }

  //订单状态1为订单已出库，2为销售已确认
  orderSatatus:number;

  getStatus() {
    if (this.object.order_status_id == this.appconfig.get('sale.order.status.salecheckcomplate')) {
      this.orderSatatus = 1
    } else if (this.object.order_status_id == this.appconfig.get('sale.order.status.salecheckcomplate')) {
      this.orderSatatus = 2
    } else {
      this.orderSatatus = 0
    }
  }

  //请销售确认按钮
  salecheck() {
    this.route.navigate(['/pages/shipping/order/edit', this.object.order_id]);
  }

  //已发货按钮
  @ViewChild('checkdialog') checkModal:ModalDirective;

  shipping() {
    this.checkModal.show();
  }

  putshipping() {
    let body = {
      order_id: this.object.order_id,
      update_status: this.appconfig.get('sale.order.status.delivered')
    };
    this.object.order_status_id = body.update_status;
    console.log(this.object);
    this.shippingservice.shipping(body).subscribe(()=> {
      this.checkModal.hide();
      this.objectChange.emit(this.object);
    });
  }

}
