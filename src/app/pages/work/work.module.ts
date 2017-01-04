import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import {AgGridModule} from 'ag-grid-ng2/main';

import {routing} from './work.routing';

import {Work} from './work.component';
import {TaskComponent} from './components/task/task/task.component';
import {TaskManagerComponent} from './components/task/task_manager/task_manager.component';
import {MonthComponent} from './components/report/month/month.component';
import {WeekComponent} from './components/report/week/week.component';

@NgModule({
  imports: [CommonModule,NgaModule,routing,AgGridModule.withAotSupport()],
  declarations: [
    TaskComponent,
    TaskManagerComponent,
    MonthComponent,
    WeekComponent,
    Work
  ]
})

export default class WorkModule{}
