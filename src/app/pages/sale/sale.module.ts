import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import {AgGridModule} from 'ag-grid-ng2/main';
import { FormsModule as AngularFormsModule } from '@angular/forms';

import {routing} from './sale.routing';

import {Sale} from './sale.component';
import {ProvisionComponent} from './components/info/provision/provision.component';
import {OrderManagerComponent} from './components/order/order_manager/list/order-list.component.ts';
import {OrderEditComponent} from './components/order/order_manager/edit/order-edit';
import {InquiryComponent} from './components/saletable/inquiry/inquiry.component';

@NgModule({
  imports: [CommonModule,NgaModule,AgGridModule.withAotSupport(),routing,AngularFormsModule],
  declarations: [
    Sale,
    ProvisionComponent,
    OrderManagerComponent,
    OrderEditComponent,
    InquiryComponent
  ]
})

export default class SaleModule{}
