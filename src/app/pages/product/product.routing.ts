import { Routes, RouterModule }  from '@angular/router';

import {ProductsComponent} from './products/products.component';
import {ProductComponent} from "./product.component";


// noinspection TypeScriptValidateTypes
const routes:Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {path: 'products', component: ProductsComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
