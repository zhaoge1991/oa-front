import {Routes, RouterModule} from '@angular/router';
import {InformationComponent} from './information.component.ts';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

import {ListComponent as OpinionListComponent} from './opinion/list.component';
import {DetailComponent as OpinionDetailComponent} from './opinion/detail.component';
import {EditComponent as OpinionEditComponent} from './opinion/edit.component';

import {ListComponent as AnnouncementListComponent} from './announcement/list.component';
import {DetailComponent as AnnouncementDetailComponent} from './announcement/detail.component';
import {EditComponent as AnnouncementEditComponent} from './announcement/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'information',
        component: InformationComponent,
        children: [
            {path: 'opinion', component: OpinionListComponent},
            {path: 'opinion/detail/:id', component: OpinionDetailComponent},
            {path: 'opinion/edit', component: OpinionEditComponent,canDeactivate: [CanDeactivateGuard]},
            {path: 'opinion/edit/:id', component: OpinionEditComponent,canDeactivate: [CanDeactivateGuard]},

            {path: 'announcement', component: AnnouncementListComponent},
            {path: 'announcement/detail/:id', component: AnnouncementDetailComponent},
            {path: 'announcement/edit', component: AnnouncementEditComponent,canDeactivate: [CanDeactivateGuard]},
            {path: 'announcement/edit/:id', component: AnnouncementEditComponent,canDeactivate: [CanDeactivateGuard]},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
