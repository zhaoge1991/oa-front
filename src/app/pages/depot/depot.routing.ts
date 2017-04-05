import { Routes, RouterModule }  from '@angular/router';

import {OrderComponent} from './order/order.component';
import {DepotComponent} from "./depot.component";
import {ProcurementOrderComponent} from './procurementOrder/procurementOrder.component';

// noinspection TypeScriptValidateTypes
const routes:Routes = [
  {
    path: '',
    component: DepotComponent,
    children: [
      {path: 'order', component: OrderComponent},
      {path: 'procurement_order', component: ProcurementOrderComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
