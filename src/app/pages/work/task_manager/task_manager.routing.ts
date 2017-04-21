import {Routes, RouterModule} from '@angular/router';
import {TaskManagerComponent} from './task_manager.component.ts';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {ListComponent as TaskManagersListComponent} from "./task_managers/list.component";
import {ListComponent as MySourceTaskListComponent} from "./my_source_task/list.component";
import {ListComponent as CompleteTaskListComponent} from "./complete_task/list.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'task_manager',
        component: TaskManagerComponent,
        children: [
            {path: 'task_managers', component: TaskManagersListComponent},
            {path: 'my_source_task', component: MySourceTaskListComponent},
            {path: 'complete_task', component: CompleteTaskListComponent},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
