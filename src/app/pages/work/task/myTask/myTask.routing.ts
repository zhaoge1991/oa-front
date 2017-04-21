import {Routes, RouterModule} from '@angular/router';
import {MyTaskComponent} from './myTask.component';

import {ListComponent} from './components/list.component';
import {CanDeactivateGuard} from "../../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

//noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: MyTaskComponent,
        children: [
            {path: '',component: ListComponent}
        ]
    }
];

export const routing = RouterModule.forChild(routes);
