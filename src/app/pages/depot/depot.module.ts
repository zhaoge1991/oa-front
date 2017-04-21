import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProcurementOrderService} from '../../services/procurement/procurementOrder.service'
import {DepotComponent} from "./depot.component";
import { OrderModule} from './order/order.module';
import { ProcurementOrderModule} from './procurementOrder/procurementOrder.module';
import {routing} from './depot.routing';
import {OrderService} from "../../services/order/order.service";
import { WarehouseEnterModule} from './warehouseEnter/warehouseEnter.module';
import {WarehouseEnterService} from '../../services/depot/warehouseEnter.service';
import { WarehouseOutModule} from './warehouseOut/warehouseOut.module';
import {WarehouseOutService} from '../../services/depot/warehouseOut.service';

import {ProductListService} from "../../services/product/productList/product_list.service";
import { InventoryModule} from './inventory/inventory.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    OrderModule,
    ProcurementOrderModule,
    WarehouseEnterModule,
    WarehouseOutModule,
    InventoryModule
    
  ],
  declarations: [
    DepotComponent
  ],
  providers: [OrderService,ProcurementOrderService,WarehouseEnterService,WarehouseOutService,ProductListService]
})

export class DepotModule {
}
