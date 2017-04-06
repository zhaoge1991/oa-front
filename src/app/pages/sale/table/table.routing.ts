import {Routes, RouterModule} from '@angular/router';
import {TableComponent} from './table.component.ts';

//import {ListComponent} from './components/list.component';
//import {EditComponent} from './components/edit.component.ts';
//import {DetailComponent} from './components/detail.component';
import {CanDeactivateGuard} from "../../../theme/oa-them/guards/candeactivate/candeactivate.guard";
//import {OrderComponent} from "./order/order.component";
import {InquiryComponent} from "./inquiry/inquiry.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'table',
        component: TableComponent,
        children: [
            {path: 'inquiry', loadChildren: 'app/pages/sale/table/inquiry/inquiry.module#InquiryModule'},
            {path: 'contract', loadChildren: 'app/pages/sale/table/contract/contract.module#ContractModule'},
            {path: 'demand', loadChildren: 'app/pages/sale/table/demand/demand.module#DemandModule'},
            {path: 'shipment', loadChildren: 'app/pages/sale/table/shipment/shipment.module#ShipmentModule'},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
