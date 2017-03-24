import { Routes, RouterModule }  from '@angular/router';

import {OrderComponent} from './order/order.component';
import {BalancePaymentModule} from "./balance_paymentOrder/balance_paymentOrder.module";
import {FinanceComponent} from "./finance.component";
import {BalanceTransportModule} from "./balance_transport/balance_transportOrder.module";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children:[
      {path: 'order', component: OrderComponent},
      {path: 'balance_payment', component: BalancePaymentModule},
      {path: 'balance_transport', component: BalanceTransportModule},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
