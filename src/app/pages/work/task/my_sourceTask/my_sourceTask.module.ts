import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './my_sourceTask.routing';
import {OaModule} from "../../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {OrderService} from "../../../../services/order/order.service";

import { MySourceTaskComponent} from './my_sourceTask.component'
import { ListComponent } from './components/list.component';
import {CanDeactivateGuard} from "../../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {SharedModule} from "../../shared/shared.module";
import {TaskService} from "../../../../services/work/task/task.service";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    OaModule,
    SharedModule,
    AgGridModule.withComponents([]),
    routing
  ],
  declarations: [
    ListComponent,
    MySourceTaskComponent
  ],
  providers: [CanDeactivateGuard,TaskService]
})
export class MySourceTasksModule {}
