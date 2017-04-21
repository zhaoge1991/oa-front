import {Routes, RouterModule} from '@angular/router';
import {WarehouseOutComponent} from './warehouseOut.component';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component';
import {DetailComponent} from './components/detail.component';

const routes: Routes = [
    {
        path: 'out_order',
        component: WarehouseOutComponent,
        children: [
            {path: '',component: ListComponent,},
            {path: 'edit/:id', component: EditComponent},
            {path: 'edit', component: EditComponent},
            {path: 'detail/:id', component: DetailComponent}
            ]
    }
];

export const routing = RouterModule.forChild(routes);
