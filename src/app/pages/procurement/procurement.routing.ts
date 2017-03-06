import { Routes, RouterModule }  from '@angular/router';
import { ProcurementComponent } from './procurement.component';
import {OrderComponent} from './order/order.component';
const routes: Routes = [
  {
    path: '',
    component: ProcurementComponent,
    children:[
        {
        path: 'order',
        component: OrderComponent
    }
    
    ]
  }
];

export const routing = RouterModule.forChild(routes);
