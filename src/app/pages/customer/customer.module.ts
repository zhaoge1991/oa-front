import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { routing } from './customer.routing';
import { CustomersModule} from './customers/customers.module';
import {OaModule} from "../../theme/oa-them/oa.module";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    CustomersModule,
    OaModule,
  ],
  declarations: [
    CustomerComponent
  ],
  providers: []
})
export class CustomerModule {
}

