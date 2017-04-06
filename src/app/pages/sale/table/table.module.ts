import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './table.routing.ts';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {OrderService} from "../../../services/order/order.service.ts";

import { TableComponent} from './table.component.ts'
//import {OrderModule} from "./order/order.module";
import {InquiryModule} from "./inquiry/inquiry.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    InquiryModule
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule {}
