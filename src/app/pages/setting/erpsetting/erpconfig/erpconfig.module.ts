import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular/main';

import { routing } from './erpconfig.routing';
import {ListComponent} from "./components/list.component";
import {OaModule} from "../../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../../theme/nga.module";
import {EditComponent} from "./components/edit.component";
import {ErpconfigComponent} from "./erpconfig.component";



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
    ErpconfigComponent,
    ListComponent,
    EditComponent
  ],
})

export class ErpconfigModule{}
