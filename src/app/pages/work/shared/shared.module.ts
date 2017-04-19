import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';
import {TaskProgressComponent} from "./task_progress/taskProgress.component";
import {TaskListComponent} from "./task_list/taskList.component";
import {ReportListComponent} from "./report_list/report_list.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OaModule,
    NgaModule,
    AgGridModule
  ],
  declarations: [
    TaskProgressComponent,
    TaskListComponent,
    ReportListComponent
  ],
  exports: [TaskProgressComponent,TaskListComponent,ReportListComponent],
  providers: []
})
export class SharedModule {
}

