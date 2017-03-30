import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './demander.routing';
import { DemanderComponent} from './demander.component'
import { ListComponent } from './components/list.component';
//import { DetailComponent } from './components/detail.component';
import { EditComponent } from './components/edit.component';
import {PipeModule} from "../../../pipe/pipe.module"
import { FormsModule } from '@angular/forms';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';
import {AgGridComponentModule} from "../../../modules/agGrid/agGridComponent.module"
import { ProcurementShareModule } from "../share/procurementShare.module";
@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    OaModule,
    FormsModule,
    AgGridModule.withComponents([]),
    PipeModule,
    AgGridComponentModule,
    ProcurementShareModule,

  ],
  declarations: [
    ListComponent,
//    DetailComponent,
    EditComponent,
    DemanderComponent,

  ]
})
export class DemanderModule {}
