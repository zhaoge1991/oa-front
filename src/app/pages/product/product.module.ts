import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ProductComponent} from "./product.component";
import { ProductsModule } from './products/products.module';

import {routing} from './product.routing';
import {ProductCatalogService} from "../../services/product/productCatalog/product_catalog.service";
import {ProductListService} from "../../services/product/productList/product_list.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ProductsModule,
  ],
  declarations: [
    ProductComponent
  ],
  providers: [ProductCatalogService,ProductListService]
})

export class ProductModule {
}
