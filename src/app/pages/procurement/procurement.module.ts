import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { routing } from './procurement.routing';
import { OrderModule} from './order/order.module';
import {OrderService} from '../../services/order/order.service'
import { ProcurementOrderModule} from './procurementOrder/procurementOrder.module';
//import {OrderComponent} from './order/order.component';
//import {ProcurementOrderComponent} from './procurementOrder/procurementOrder.component'


@NgModule({
  imports: [
    CommonModule,
    routing,
    OrderModule,
    ProcurementOrderModule
  ],
  declarations: [
    ProcurementComponent,
//    OrderComponent,
//    ProcurementOrderComponent
  ],
  providers:[OrderService]
})
export class ProcurementModule {}