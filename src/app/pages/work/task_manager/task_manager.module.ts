import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './task_manager.routing.ts';

import { TaskManagerComponent} from './task_manager.component.ts'

import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

//import { MySourceTaskComponent} from './my_sourceTask.component'
import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {SharedModule} from "../shared/shared.module";
import {TaskService} from "../../../services/work/task/task.service";
import { ListComponent as TaskManagersListComponent} from './task_managers/list.component';
import { ListComponent as MySourceTaskListComponent} from './my_source_task/list.component';
import { ListComponent as CompleteTaskListComponent} from './complete_task/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    OaModule,
    SharedModule,
    routing
  ],
  declarations: [
    TaskManagerComponent,
    TaskManagersListComponent,
    MySourceTaskListComponent,
    CompleteTaskListComponent
  ],
  providers: [CanDeactivateGuard,TaskService]
})
export class TaskManagerModule {}
