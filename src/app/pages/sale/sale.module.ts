import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SaleComponent} from './sale.component';
import { OrderModule} from './order/order.module';

import {routing} from './sale.routing';
import {DirectorModule} from "./directorOrder/director.module";
import {BalancePaymentModule} from "./balance_paymentOrder/balance_paymentOrder.module";
import {OrderService} from "../../services/order/order.service";
import {BalanceTransportModule} from "./balance_transport/balance_transportOrder.module";
import {TableModule} from "./table/table.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    OrderModule,
    DirectorModule,
    BalancePaymentModule,
    BalanceTransportModule,
    TableModule
  ],
  declarations: [
    SaleComponent
  ],
  providers: [OrderService]
})

export class SaleModule{

}
