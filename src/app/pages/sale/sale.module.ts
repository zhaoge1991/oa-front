import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import {AgGridModule} from 'ag-grid-ng2/main';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import {routing} from './sale.routing';
import {OrderManagerService} from "./ordermanager.service";

import {Sale} from './sale.component';
import {ProvisionComponent} from "./components/info/provision/provision.component";
import {OrderManagerComponent} from "./components/order/order_manager/list/order-list.component";
import {OrderEditComponent} from "./components/order/order_manager/edit/order-edit";
import {OrderDetailComponent} from "./components/order/order_manager/detail/order-detail";
import {InquiryComponent} from "./components/saletable/inquiry/inquiry.component";






@NgModule({
  imports: [CommonModule,NgaModule,AgGridModule.withAotSupport(),routing,AngularFormsModule,HttpModule,DropdownModule, ModalModule],
  declarations: [
    Sale,
    ProvisionComponent,
    OrderManagerComponent,
    OrderEditComponent,
    OrderDetailComponent,
    InquiryComponent
  ],
  providers: [OrderManagerService]
})

export default class SaleModule{}
