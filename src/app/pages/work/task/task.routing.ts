import {Routes, RouterModule} from '@angular/router';
import {TaskComponent} from './task.component.ts';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'task',
        component: TaskComponent,
        children: [
            {path: 'tasks', loadChildren: 'app/pages/work/task/tasks/tasks.module#TasksModule'},
            {path: 'my_source_tasks', loadChildren: 'app/pages/work/task/my_sourceTask/my_sourceTask.module#MySourceTasksModule'},
            {path: 'my_tasks', loadChildren: 'app/pages/work/task/myTask/myTask.module#MyTasksModule'},
            {path: 'cc_tasks', loadChildren: 'app/pages/work/task/ccTask/ccTask.module#CcTasksModule'},
            {path: 'complete_tasks', loadChildren: 'app/pages/work/task/completeTask/completeTask.module#CompleteTasksModule'},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
