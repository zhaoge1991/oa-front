import {Component, Input,EventEmitter,Output,ViewChild,OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/index";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {ProcurementSaleOrderService} from "../../../../../../services/procurement/procurementSaleOrder.service";
import {OrderOperat} from "../../../../../../models/sale/order/OrderOperat";

@Component({
  selector: 'bar-common-action-bar-procurmentOrder',
  templateUrl: './procurmentOrderActionBar.component.html',
  providers: [ProcurementSaleOrderService]
})

export class ProcurmentOrderActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();
  private operat: OrderOperat;
  constructor(private appconfig: AppconfigService,private procurementsaleorderservice: ProcurementSaleOrderService) {}

  ngOnChanges(){
    if(this.object){
      this.operat = this.procurementsaleorderservice.getOperat(this.object);
    }
  }

  //核销按钮
  private isrefuse: boolean = null;
  private reason: string;
  @ViewChild('checkdialog') checkModal: ModalDirective;
  chowcheck(){
    this.checkModal.show();
  }
  checkChange(check:boolean){
    this.isrefuse = !check;
  }

  //核销订单
  checkorder(){
    let result = !this.isrefuse;
    let reson = this.reason;
    let body;
    if(result){
      body = {
        order_id: this.object.order_id,
        update_status: this.appconfig.get('sale.order.status.complete')
      }
    } else {
      body = {
        order_id: this.object.order_id,
        update_status: this.appconfig.get('sale.order.status.customerreceived')
      }
    }
    this.procurementsaleorderservice.closure(body).subscribe(()=>{
      this.checkModal.hide();
      this.objectChange.emit(this.object);
    });
  }

}
