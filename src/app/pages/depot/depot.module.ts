import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {DepotComponent} from "./depot.component";
import { OrderModule} from './order/order.module';

import {routing} from './depot.routing';
import {OrderService} from "../../services/order/order.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    OrderModule,
  ],
  declarations: [
    DepotComponent
  ],
  providers: [OrderService]
})

export class DepotModule {
}
