import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import  {routing} from './erpsetting.routing';
import {CountryModule} from "./country/country.module";
import {ZoneModule} from "./zone/zone.module";
import {CurrencyModule} from "./currency/currency.module";
import {QuantifierModule} from "./quantifier/quantifier.module";
import {ErpconfigModule} from "./erpconfig/erpconfig.module";
import {ErpsettingComponent} from "./erpsetting.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CountryModule,
    ZoneModule,
    CurrencyModule,
    QuantifierModule,
    ErpconfigModule,
    routing,
  ],
  declarations: [ErpsettingComponent],
})

export class ErpsettingModule{}
