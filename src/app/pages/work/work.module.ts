import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkComponent } from './work.component';
import { routing } from './work.routing';
import {OaModule} from "../../theme/oa-them/oa.module";

//import { OrderModule} from './order/order.module';
import {OrderService} from "../../services/order/order.service";
import {ShippingService} from "../../services/shipping/shipping.service";
import {TaskModule} from "./task/task.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    OaModule,
    TaskModule
  ],
  declarations: [
    WorkComponent
  ],
  providers: [OrderService, ShippingService]
})
export class WorkModule {
}

