import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './report.routing';

import { ReportComponent} from './report.component'

import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {SharedModule} from "../shared/shared.module";
import { Ng2UeditorModule } from 'ng2-ueditor';

import {ReportService} from "../../../services/work/report/report.service";
import {ListComponent as ReportWeekListComponent} from './week/list.component';
import {DetailComponent as ReportWeekDetailComponent} from './week/detail.component';
import {EditComponent as ReportWeekEditComponent} from './week/edit.component';
import {ListComponent as ReportMonthListComponent} from './month/list.component';
import {DetailComponent as ReportMonthDetailComponent} from './month/detail.component';
import {EditComponent as ReportMonthEditComponent} from './month/edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgaModule,
    OaModule,
    SharedModule,
    Ng2UeditorModule
  ],
  declarations: [
    ReportComponent,
    ReportWeekListComponent,
    ReportWeekDetailComponent,
    ReportWeekEditComponent,
    ReportMonthListComponent,
    ReportMonthDetailComponent,
    ReportMonthEditComponent,
  ],
  providers: [CanDeactivateGuard,ReportService]
})
export class ReportModule {}
