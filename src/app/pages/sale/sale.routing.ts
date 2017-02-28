import { Routes, RouterModule }  from '@angular/router';

import {Sale} from './sale.component';

import {ProvisionComponent} from "./components/info/provision/provision.component";

import {OrderManagerComponent} from "./components/order/order_manager/list/order-list.component";
import {OrderEditComponent} from "./components/order/order_manager/edit/order-edit";
import {OrderDetailComponent} from "./components/order/order_manager/detail/order-detail";

import {InquiryComponent} from "./components/saletable/inquiry/inquiry.component";



// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Sale,
    children: [
      {
        path: 'sale-table',
        children: [
          {path: 'inquiry',component: InquiryComponent}
        ]
      },
      {
        path: 'order-manager',
        component: OrderManagerComponent
      },
      {
        path: 'order-manager',
        children: [
          {path: 'edit', component: OrderEditComponent},
          {path: 'edit/:id', component: OrderEditComponent},
          {path: 'detail/:id', component: OrderDetailComponent},
        ]
      },
      {
        path: 'info',
        children: [
          {path: 'provision',component: ProvisionComponent}
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
