import {Routes, RouterModule} from '@angular/router';
import {BalancePaymentComponent} from './balance_paymentOrder.component';

import {ListComponent} from './components/list.component';
import {DetailComponent} from './components/detail.component.ts';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'balance_payment',
    component: BalancePaymentComponent,
    children: [
      {path: '',component: ListComponent},
      {path: 'detail/:id', component: DetailComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
