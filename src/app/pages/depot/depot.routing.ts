import { Routes, RouterModule }  from '@angular/router';

import {OrderComponent} from './order/order.component';
import {DepotComponent} from "./depot.component";


// noinspection TypeScriptValidateTypes
const routes:Routes = [
  {
    path: '',
    component: DepotComponent,
    children: [
      {path: 'order', component: OrderComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
