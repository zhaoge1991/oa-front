import { Routes, RouterModule }  from '@angular/router';
import {SaleComponent} from './sale.component';
import {OrderComponent} from './order/order.component';
import {DirectorComponent} from "./director/director.component";

const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    children:[
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'director',
        component: DirectorComponent
      }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
