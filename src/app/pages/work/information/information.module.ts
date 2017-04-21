import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './information.routing';

import { InformationComponent} from './information.component'

import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {SharedModule} from "../shared/shared.module";
import { Ng2UeditorModule } from 'ng2-ueditor';

import {OpinionService} from "../../../services/work/information/information.service";
import {ListComponent as OpinionListComponent} from './opinion/list.component';
import {DetailComponent as OpinionDetailComponent} from './opinion/detail.component';
import {EditComponent as OpinionEditComponent} from './opinion/edit.component';

import {AnnouncementService} from "../../../services/work/information/announcement.service";
import {ListComponent as AnnouncementListComponent} from './announcement/list.component';
import {DetailComponent as AnnouncementDetailComponent} from './announcement/detail.component';
import {EditComponent as AnnouncementEditComponent} from './announcement/edit.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    NgaModule,
    OaModule,
    AgGridModule,
    SharedModule,
    Ng2UeditorModule
  ],
  declarations: [
    InformationComponent,
    OpinionListComponent,
    OpinionDetailComponent,
    OpinionEditComponent,
    AnnouncementListComponent,
    AnnouncementDetailComponent,
    AnnouncementEditComponent,
  ],
  providers: [CanDeactivateGuard,OpinionService,AnnouncementService]
})
export class InformationModule {}
