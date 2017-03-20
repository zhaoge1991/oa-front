import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import {AgGridModule} from 'ag-grid-angular/main';

import {supplierStatusPipe} from "../pipe/procurement/supplier/supplierStatus.pipe";
import {supplierLevelPipe} from "../pipe/procurement/supplier/supplierLevel.pipe";
import {supplierDegreePipe} from "../pipe/procurement/supplier/supplierDegree.pipe";
import {supplierRatingPipe} from "../pipe/procurement/supplier/supplierRating.pipe";
import {amountOfCapitalPipe} from "../pipe/common/amountOfCapital.pipe";

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    
  ],
  declarations: [
    supplierStatusPipe,
    supplierLevelPipe,
    supplierDegreePipe,
    supplierRatingPipe,
    amountOfCapitalPipe
  ],
  exports:[
    supplierStatusPipe,
    supplierLevelPipe,
    supplierDegreePipe,
    supplierRatingPipe,
    amountOfCapitalPipe
  ]
})
export class PipeModule {}