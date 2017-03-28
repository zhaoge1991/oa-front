import { Routes, RouterModule }  from '@angular/router';
import { ShippingComponent } from './shipping.component';
import {OrderComponent} from './order/order.component';
const routes:Routes = [
  {
    path: '',
    component: ShippingComponent,
    children: [
      {path: 'order', component: OrderComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
