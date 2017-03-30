import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './supplier.routing';
import { SupplierComponent} from './supplier.component'
import { ListComponent } from './components/list.component';
//import { DetailComponent } from './components/detail.component';
import { EditComponent } from './components/edit.component';
import {PipeModule} from "../../../pipe/pipe.module"
import { FormsModule } from '@angular/forms';
import { AnalysisComponent } from './components/analysis.component';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';
import {AgGridDegreePipeComponent} from "../../../modules/agGrid/procurement/supplier/agGridDegreePipe.component";
import {AgGridLevelPipeComponent} from "../../../modules/agGrid/procurement/supplier/agGridLevelPipe.component";
import {AgGridRatingPipeComponent} from "../../../modules/agGrid/procurement/supplier/agGridRatingPipe.component";
import {AgGridStatusPipeComponent} from "../../../modules/agGrid/procurement/supplier/agGridStatusPipe.component";
import {AgGridComponentModule} from "../../../modules/agGrid/agGridComponent.module"
import {AgGridCurrencyComponent} from "../../../modules/agGrid/common/agGridCurrency.component";
import {AgGridMultiLineComponent} from "../../../modules/agGrid/common/agGridMultiLine.component";
import { ProcurementShareModule } from "../share/procurementShare.module";
@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    OaModule,
    FormsModule,
    AgGridModule.withComponents([
        AgGridDegreePipeComponent,
        AgGridLevelPipeComponent,
        AgGridRatingPipeComponent,
        AgGridStatusPipeComponent,
        AgGridCurrencyComponent,
        AgGridMultiLineComponent
    ]),
    PipeModule,
    AgGridComponentModule,
    ProcurementShareModule,

  ],
  declarations: [
    ListComponent,
//    DetailComponent,
    EditComponent,
    SupplierComponent,
    AnalysisComponent

  ]
})
export class SupplierModule {}
