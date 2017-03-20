import {Routes, RouterModule} from '@angular/router';
import {ProcurementOrderComponent} from './procurementOrder.component';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component';
import {DetailComponent} from './components/detail.component';

const routes: Routes = [
    {
        path: 'procurement_order',
        component: ProcurementOrderComponent,
        children: [
            {path: '',component: ListComponent,},
            {path: 'edit/:id', component: EditComponent},
            {path: 'edit', component: EditComponent},
            {path: 'detail/:id', component: DetailComponent}
            ]
    }
];

export const routing = RouterModule.forChild(routes);
