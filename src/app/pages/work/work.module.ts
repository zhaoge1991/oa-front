import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkComponent } from './work.component';
import { routing } from './work.routing';
import {OaModule} from "../../theme/oa-them/oa.module";

import {TaskModule} from "./task/task.module";
import {TaskManagerModule} from "./task_manager/task_manager.module";
import {ReportModule} from "./report/report.module";
import {InformationModule} from "./information/information.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    OaModule,
    TaskModule,
    TaskManagerModule,
    ReportModule,
    InformationModule
  ],
  declarations: [
    WorkComponent
  ]
})
export class WorkModule {
}

