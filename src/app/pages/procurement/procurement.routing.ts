import { Routes, RouterModule }  from '@angular/router';
import { ProcurementComponent } from './procurement.component';
import {OrderComponent} from './order/order.component';
import {ProcurementOrderComponent} from './procurementOrder/procurementOrder.component';
import {FreezeOrderComponent} from './freezeOrder/freezeOrder.component';
const routes: Routes = [
  {
    path: '',
    component: ProcurementComponent,
    children:[
        {path: 'order',component: OrderComponent},
        {path: 'procurement_order',component: ProcurementOrderComponent},
        {path: 'freeze_order',component: FreezeOrderComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
