import {Routes, RouterModule} from '@angular/router';
import {WarehouseEnterComponent} from './warehouseEnter.component';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component';
import {DetailComponent} from './components/detail.component';

const routes: Routes = [
    {
        path: 'enter_order',
        component: WarehouseEnterComponent,
        children: [
            {path: '',component: ListComponent,},
            {path: 'edit/:id', component: EditComponent},
            {path: 'edit', component: EditComponent},
            {path: 'detail/:id', component: DetailComponent}
            ]
    }
];

export const routing = RouterModule.forChild(routes);
