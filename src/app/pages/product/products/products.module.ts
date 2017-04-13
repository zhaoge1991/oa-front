import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './products.routing.ts';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {NgaModule} from "../../../theme/nga.module";
import {AgGridModule} from 'ag-grid-angular/main';

import { ProductsComponent} from './products.component'

import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
import {AgGridMultiLineComponent} from "../../../modules/agGrid/common/agGridMultiLine.component";
import {AgGridCurrencyComponent} from "../../../modules/agGrid/common/agGridCurrency.component";
import {AgGridComponentModule} from "../../../modules/agGrid/agGridComponent.module";
import { TreeModule } from 'angular-tree-component';
import { ListComponent } from './components/list.component';
import { EditComponent as CatalogComponent} from './components/catalog/edit.component';
import { EditComponent as ProductComponent} from './components/product/edit.component';
import {DetailComponent} from './components/product/detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    OaModule,
    TreeModule,
    AgGridModule.withComponents([
      AgGridMultiLineComponent,
      AgGridCurrencyComponent
    ]),
    AgGridComponentModule,
    routing
  ],
  declarations: [
    ProductsComponent,
    ListComponent,
    CatalogComponent,
    ProductComponent,
    DetailComponent
  ],
  providers: [CanDeactivateGuard]
})
export class ProductsModule {
}
