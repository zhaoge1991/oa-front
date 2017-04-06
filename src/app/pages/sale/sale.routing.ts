import { Routes, RouterModule }  from '@angular/router';
import {SaleComponent} from './sale.component';
import {OrderComponent} from './order/order.component';
import {DirectorComponent} from "./directorOrder/director.component";
import {BalancePaymentComponent} from "./balance_paymentOrder/balance_paymentOrder.component";
import {BalanceTransportComponent} from "./balance_transport/balance_transportOrder.component";
import {TableComponent} from "./table/table.component";
import {TableModule} from "./table/table.module";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    children:[
      {path: 'table', component: TableComponent},
      {path: 'order', component: OrderComponent},
      {path: 'director', component: DirectorComponent},
      {path: 'balance_payment', component: BalancePaymentComponent},
      {path: 'balance_transport', component: BalanceTransportComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
