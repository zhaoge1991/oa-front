import { Routes, RouterModule }  from '@angular/router';
import {SaleComponent} from './sale.component';
import {OrderComponent} from './order/order.component';
const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    children:[
      {
        path: 'order',
        component: OrderComponent
      }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
