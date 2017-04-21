import {Routes, RouterModule} from '@angular/router';
import {InventoryComponent} from './inventory.component.ts';

import {WarningComponent} from './components/warning.component';
import {DailiaoComponent} from './components/dailiao.component';
import {TurnoverComponent} from './components/turnover.component';
import {InventoryComponent as ChildInventoryComponent} from './components/inventory.component';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

// noinspection TypeScriptValidateTypes
const routes:Routes = [
  {
    path: 'inventory',
    component: InventoryComponent,
    children: [
      {path: 'warning', component: WarningComponent},
      {path: 'dailiao', component: DailiaoComponent},
      {path: 'turnover', component: TurnoverComponent},
      {path: 'inventory', component: ChildInventoryComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
