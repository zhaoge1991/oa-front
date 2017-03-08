import {Routes, RouterModule} from '@angular/router';
import {OrderComponent} from './order.component.ts';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component.ts';
import {DetailComponent} from './components/detail.component';

const routes: Routes = [
    {
        path: 'order',
        component: OrderComponent,
        children: [
            {path: '',component: ListComponent},
            {path: 'edit', component: EditComponent},
            {path: 'edit/:id', component: EditComponent},
            {path: 'detail/:id', component: DetailComponent}
            ]
    }
];

export const routing = RouterModule.forChild(routes);
