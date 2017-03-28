import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingComponent } from './shipping.component';
import { routing } from './shipping.routing';
import { OrderModule} from './order/order.module';
import {OaModule} from "../../theme/oa-them/oa.module";
import {OrderService} from "../../services/order/order.service";
import {ShippingService} from "../../services/shipping/shipping.service";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    OrderModule,
    OaModule,
  ],
  declarations: [
    ShippingComponent
  ],
  providers: [OrderService, ShippingService]
})
export class ShippingModule {
}

