import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcurementComponent} from './procurement.component';
import {routing} from './procurement.routing';
import {OrderModule} from './order/order.module';
import {ProcurementOrderModule} from './procurementOrder/procurementOrder.module';
import {ProcurementOrderService} from '../../services/procurement/procurementOrder.service'
import {FreezeOrderService} from '../../services/procurement/freezeOrder.service'
import {OaModule} from "../../theme/oa-them/oa.module";
import {FreezeOrderModule} from './freezeOrder/freezeOrder.module';
import {OrderService} from "../../services/order/order.service";
import {SupplierModule} from './supplier/supplier.module';
import {ProcurementSupplierService} from "../../services/procurement/procurementSupplier.service"
import { ProcurementShareModule } from "./share/procurementShare.module"
import {DemanderModule} from './demander/demander.module';
import {ProcurementDemanderService} from "../../services/procurement/procurementDemander.service"
@NgModule({
    imports: [
        CommonModule,
        routing,
        FormsModule,
        OrderModule,
        ProcurementOrderModule,
        OaModule,
        FreezeOrderModule,
        SupplierModule,
        ProcurementShareModule,
        DemanderModule
    ],
    declarations: [
        ProcurementComponent
    ],
    providers: [ProcurementOrderService, FreezeOrderService, OrderService, ProcurementSupplierService,ProcurementDemanderService]
})
export class ProcurementModule {}

