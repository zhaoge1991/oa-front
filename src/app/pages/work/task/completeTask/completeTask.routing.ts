import {Routes, RouterModule} from '@angular/router';
import {CompleteTaskComponent} from './completeTask.component';

import {ListComponent} from './components/list.component';
import {CanDeactivateGuard} from "../../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

//noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: CompleteTaskComponent,
        children: [
            {path: '',component: ListComponent}
        ]
    }
];

export const routing = RouterModule.forChild(routes);
