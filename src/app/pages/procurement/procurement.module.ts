import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcurementComponent } from './procurement.component';
import { routing } from './procurement.routing';
import { OrderModule} from './order/order.module';
import { ProcurementOrderModule} from './procurementOrder/procurementOrder.module';
import {OrderService} from '../../services/order/order.service'
import {ProcurementOrderService} from '../../services/procurement/procurementOrder.service'
import {FreezeOrderService} from '../../services/procurement/freezeOrder.service'
import {OaModule} from "../../theme/oa-them/oa.module";
import {FreezeOrderModule} from './freezeOrder/freezeOrder.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    OrderModule,
    ProcurementOrderModule,
    OaModule,
    FreezeOrderModule
  ],
  declarations: [
    ProcurementComponent
  ],
  providers:[OrderService,ProcurementOrderService,FreezeOrderService]
})
export class ProcurementModule {}

