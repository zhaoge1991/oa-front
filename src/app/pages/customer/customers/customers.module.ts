import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './customers.routing';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {OrderService} from "../../../services/order/order.service.ts";

import { CustomersComponent} from './customers.component.ts'
import { ListComponent } from './components/list.component';
import { DetailComponent } from './components/detail.component';
import { EditComponent } from './components/edit.component.ts';
import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {AgGridMultiLineComponent} from "../../../modules/agGrid/common/agGridMultiLine.component";
import {AgGridCurrencyComponent} from "../../../modules/agGrid/common/agGridCurrency.component";
import {AgGridComponentModule} from "../../../modules/agGrid/agGridComponent.module";
import {CustomersService} from "../../../services/customer/customers.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    OaModule,
    AgGridModule.withComponents([
      AgGridMultiLineComponent,
      AgGridCurrencyComponent
    ]),
    AgGridComponentModule,
    routing
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
    CustomersComponent
  ],
  providers: [CanDeactivateGuard,CustomersService]
})
export class CustomersModule {}
