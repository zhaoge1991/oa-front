import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './director.routing.ts';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import {SaleDirectorService} from "../../../services/directorOrder/sale-director.service";

import { DirectorComponent} from './director.component.ts'
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
    DirectorComponent
  ],
  providers: [SaleDirectorService]
})
export class DirectorModule {}
