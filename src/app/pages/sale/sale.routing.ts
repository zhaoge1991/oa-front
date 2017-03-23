import { Routes, RouterModule }  from '@angular/router';
import {SaleComponent} from './sale.component';
import {OrderComponent} from './order/order.component';
import {DirectorComponent} from "./directorOrder/director.component";
import {BalancePaymentModule} from "./balance_paymentOrder/balance_paymentOrder.module";
import {BalanceTransportModule} from "./balance_transport/balance_transportOrder.module";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    children:[
      {path: 'order', component: OrderComponent},
      {path: 'director', component: DirectorComponent},
      {path: 'balance_payment', component: BalancePaymentModule},
      {path: 'balance_transport', component: BalanceTransportModule}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
