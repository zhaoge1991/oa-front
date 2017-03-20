import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {SaleComponent} from './sale.component';
import { OrderModule} from './order/order.module';

import {routing} from './sale.routing';
import {DirectorModule} from "./director/director.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    OrderModule,
    DirectorModule
  ],
  declarations: [
    SaleComponent
  ]
})

export class SaleModule{}
