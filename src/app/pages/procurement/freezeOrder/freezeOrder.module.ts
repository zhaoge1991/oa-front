import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './freezeOrder.routing';
import { FreezeOrderComponent} from './freezeOrder.component'
import { ListComponent } from './components/list.component';
import { DetailComponent } from './components/detail.component';
import { EditComponent } from './components/edit.component';
import {PipeModule} from "../../../pipe/pipe.module"
import { FormsModule } from '@angular/forms';

import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';
import {AgGridComponentModule} from "../../../modules/agGrid/agGridComponent.module"
import {AgGridCurrencyComponent} from "../../../modules/agGrid/common/agGridCurrency.component";
import {AgGridMultiLineComponent} from "../../../modules/agGrid/common/agGridMultiLine.component";

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    OaModule,
    FormsModule,
    AgGridModule.withComponents([
        AgGridCurrencyComponent,
        AgGridMultiLineComponent
    ]),
    PipeModule,
    AgGridComponentModule
    
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
    FreezeOrderComponent
    
  ]
})
export class FreezeOrderModule {}