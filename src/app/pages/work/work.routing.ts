import { Routes, RouterModule }  from '@angular/router';
import { WorkComponent } from './work.component';
import {TaskComponent} from "./task/task.component";
import {TaskManagerComponent} from "./task_manager/task_manager.component";

const routes:Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      {path: 'task', component: TaskComponent},
      {path: 'task_manager', component: TaskManagerComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
