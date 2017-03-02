import { Routes, RouterModule }  from '@angular/router';

import {Work} from './work.component';
import {TaskComponent} from './components/task/task/task.component';
import {TaskManagerComponent} from './components/task/task_manager/task_manager.component';
import {MonthComponent} from './components/report/month/month.component';
import {WeekComponent} from './components/report/week/week.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Work,
    children: [
      { path: 'task', component: TaskComponent },
      { path: 'task_manager', component: TaskManagerComponent },
      {
        path: 'report',
        children: [
          {path: 'week',component: WeekComponent},
          {path: 'month',component: MonthComponent}
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
