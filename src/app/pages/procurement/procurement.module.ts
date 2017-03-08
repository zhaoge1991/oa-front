import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { routing } from './procurement.routing';
import { OrderModule} from './order/order.module';
import {OrderService} from '../../services/order/order.service'

@NgModule({
  imports: [
    CommonModule,
    routing,
    OrderModule
  ],
  declarations: [
    ProcurementComponent
  ],
  providers:[OrderService]
})
export class ProcurementModule {}