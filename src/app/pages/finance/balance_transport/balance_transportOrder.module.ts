import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './balance_transportOrder.routing';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import { BalanceTransportComponent } from './balance_transportOrder.component'
import { ListComponent } from './components/list.component';
import { DetailComponent } from './components/detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    OaModule,
    AgGridModule.withComponents([]),
    routing
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    BalanceTransportComponent
  ]
})
export class BalanceTransportModule {}
