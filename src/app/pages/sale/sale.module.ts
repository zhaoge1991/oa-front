import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import {AgGridModule} from 'ag-grid-ng2/main';

import {routing} from './sale.routing';

import {Sale} from './sale.component';
import {ProvisionComponent} from './components/info/provision/provision.component';
import {OrderManagerComponent} from './components/order/order_manager/order_manager.component';
import {InquiryComponent} from './components/saletable/inquiry/inquiry.component';

@NgModule({
  imports: [CommonModule,NgaModule,AgGridModule.withAotSupport(),routing],
  declarations: [
    Sale,
    ProvisionComponent,
    OrderManagerComponent,
    InquiryComponent
  ]
})

export default class SaleModule{}
