import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {FinanceComponent} from "./finance.component";
import { OrderModule} from './order/order.module';

import {routing} from './finance.routing';
import {BalancePaymentModule} from "./balance_paymentOrder/balance_paymentOrder.module";
import {OrderService} from "../../services/order/order.service";
import {BalanceTransportModule} from "./balance_transport/balance_transportOrder.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    OrderModule,
    BalancePaymentModule,
    BalanceTransportModule
  ],
  declarations: [
    FinanceComponent
  ],
  providers: [OrderService]
})

export class FinanceModule{}
