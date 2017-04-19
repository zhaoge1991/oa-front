import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkComponent } from './work.component';
import { routing } from './work.routing';
import {OaModule} from "../../theme/oa-them/oa.module";

import {TaskModule} from "./task/task.module";
import {TaskManagerModule} from "./task_manager/task_manager.module";
import {ReportModule} from "./report/report.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    OaModule,
    TaskModule,
    TaskManagerModule,
    ReportModule
  ],
  declarations: [
    WorkComponent
  ]
})
export class WorkModule {
}

