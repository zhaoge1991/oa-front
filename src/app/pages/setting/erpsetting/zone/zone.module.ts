import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular/main';

import { routing } from './zone.routing';
import { ZoneComponent }  from './zone.component';
import {ListComponent} from "./components/list.component";
import {OaModule} from "../../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../../theme/nga.module";
import {DetailComponent} from "./components/detail.component";
import {EditComponent} from "./components/edit.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OaModule,
    NgaModule,
    AgGridModule.withComponents([
    ]),
    routing,
  ],
  declarations: [
    ZoneComponent,
    ListComponent,
    DetailComponent,
    EditComponent
  ],
})

export class ZoneModule{}
