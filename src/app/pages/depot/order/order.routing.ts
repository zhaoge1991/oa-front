import {Routes, RouterModule} from '@angular/router';
import {OrderComponent} from './order.component.ts';

import {ListComponent} from './components/list.component';
import {DetailComponent} from './components/detail.component';
import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

// noinspection TypeScriptValidateTypes
const routes:Routes = [
  {
    path: 'order',
    component: OrderComponent,
    children: [
      {path: '', component: ListComponent},
      {path: 'detail/:id', component: DetailComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
