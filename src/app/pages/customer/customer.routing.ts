import { Routes, RouterModule }  from '@angular/router';
import { CustomerComponent } from './customer.component';
import {CustomersComponent} from './customers/customers.component';
const routes:Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {path: 'customers', component: CustomersComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
