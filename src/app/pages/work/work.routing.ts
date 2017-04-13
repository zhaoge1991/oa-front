import { Routes, RouterModule }  from '@angular/router';
import { WorkComponent } from './work.component';
import {TaskComponent} from "./task/task.component";

const routes:Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      {path: 'task', component: TaskComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
