import {Routes, RouterModule} from '@angular/router';
import {OrderComponent} from './order.component';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component';
import {ShowComponent} from './components/show.component';

const routes: Routes = [
    {
        path: 'order',
        component: OrderComponent,
        children: [
            {path: '',component: ListComponent,},
            {path: 'edit/:id', component: EditComponent}
            ]
    }
];

export const routing = RouterModule.forChild(routes);
