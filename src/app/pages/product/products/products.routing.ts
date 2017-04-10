import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products.component';

import {ListComponent} from './components/list.component';
import { EditComponent as CatalogComponent} from './components/catalog/edit.component';
import { EditComponent as ProductComponent} from './components/product/edit.component';

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";

// noinspection TypeScriptValidateTypes
const routes:Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {path: '', component: ListComponent},
      {path: 'catalog/edit', component: CatalogComponent,canDeactivate: [CanDeactivateGuard]},
      {path: 'catalog/edit/:id', component: CatalogComponent,canDeactivate: [CanDeactivateGuard]},
      {path: 'product/edit', component: ProductComponent,canDeactivate: [CanDeactivateGuard]},
      {path: 'product/edit/:id', component: ProductComponent,canDeactivate: [CanDeactivateGuard]},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
