import { Routes, RouterModule }  from '@angular/router';
import { WorkComponent } from './work.component';
import {TaskComponent} from "./task/task.component";
import {TaskManagerComponent} from "./task_manager/task_manager.component";
import {ReportWeekComment} from "../../models/work/report/reportWeekComment";

const routes:Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      {path: 'task', component: TaskComponent},
      {path: 'task_manager', component: TaskManagerComponent},
      {path: 'report/week', component: ReportWeekComment},
      //{path: 'report/month', component: ReportMonthComment}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
