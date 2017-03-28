import {Routes, RouterModule} from '@angular/router';
import {BalanceTransportComponent} from './balance_transportOrder.component';

import {ListComponent} from './components/list.component';
import {DetailComponent} from './components/detail.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'balance_transport',
    component: BalanceTransportComponent,
    children: [
      {path: '',component: ListComponent},
      {path: 'detail/:id', component: DetailComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
