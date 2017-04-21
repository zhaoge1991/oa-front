import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './report.component.ts';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

import {ListComponent as ReportWeekListComponent} from './week/list.component';
import {DetailComponent as ReportWeekDetailComponent} from './week/detail.component';
import {EditComponent as ReportWeekEditComponent} from './week/edit.component';

import {ListComponent as ReportMonthListComponent} from './month/list.component';
import {DetailComponent as ReportMonthDetailComponent} from './month/detail.component';
import {EditComponent as ReportMonthEditComponent} from './month/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'report',
        component: ReportComponent,
        children: [
            {path: 'week', component: ReportWeekListComponent},
            {path: 'week/detail/:id', component: ReportWeekDetailComponent},
            {path: 'week/edit', component: ReportWeekEditComponent,canDeactivate: [CanDeactivateGuard]},
            {path: 'week/edit/:id', component: ReportWeekEditComponent,canDeactivate: [CanDeactivateGuard]},

            {path: 'month', component: ReportMonthListComponent},
            {path: 'month/detail/:id', component: ReportMonthDetailComponent},
            {path: 'month/edit', component: ReportMonthEditComponent,canDeactivate: [CanDeactivateGuard]},
            {path: 'month/edit/:id', component: ReportMonthEditComponent,canDeactivate: [CanDeactivateGuard]},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
