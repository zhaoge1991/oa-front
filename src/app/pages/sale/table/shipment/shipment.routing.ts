import {Routes, RouterModule} from '@angular/router';
import {ShipmentComponent} from './shipment.component.ts';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component.ts';
import {DetailComponent} from './components/detail.component';
import {CanDeactivateGuard} from "../../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

//noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: ShipmentComponent,
        children: [
            {path: '',component: ListComponent},
            {path: 'edit', component: EditComponent,canDeactivate: [CanDeactivateGuard]},
            {path: 'edit/:id', component: EditComponent,canDeactivate: [CanDeactivateGuard]},
            {path: 'detail/:id', component: DetailComponent},
        ]
    }
];

export const routing = RouterModule.forChild(routes);
