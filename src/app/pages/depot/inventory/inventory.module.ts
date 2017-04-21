import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './inventory.routing.ts';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import { InventoryComponent} from './inventory.component'
import { WarningComponent } from './components/warning.component';
import { DailiaoComponent } from './components/dailiao.component';
import { TurnoverComponent } from './components/turnover.component';
import {InventoryComponent as ChildInventoryComponent} from './components/inventory.component';
import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {AgGridMultiLineComponent} from "../../../modules/agGrid/common/agGridMultiLine.component";
import {AgGridCurrencyComponent} from "../../../modules/agGrid/common/agGridCurrency.component";
import {AgGridComponentModule} from "../../../modules/agGrid/agGridComponent.module";


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
    InventoryComponent,
    WarningComponent,
    DailiaoComponent,
    TurnoverComponent,
    ChildInventoryComponent
    
  ],
  providers: [CanDeactivateGuard]
})
export class InventoryModule {
}
