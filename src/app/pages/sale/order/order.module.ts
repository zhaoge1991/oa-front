import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './order.routing.ts';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {SaleOrderService} from "../../../services/sale-orderService/sale-order.service";

import { OrderComponent} from './order.component.ts'
import { ListComponent } from './components/list.component';
import { DetailComponent } from './components/detail.component';
import { EditComponent } from './components/edit.component.ts';


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
    EditComponent,
    OrderComponent
  ],
  providers: [SaleOrderService]
})
export class OrderModule {}
