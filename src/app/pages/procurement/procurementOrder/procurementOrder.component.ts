import {Component} from '@angular/core';
import {ProcurementOrderService} from '../../../services/procurement/procurementOrder.service'
@Component({
    selector: 'procurement-procurement-order',
    template: `<router-outlet></router-outlet>`
})
export class ProcurementOrderComponent {
    constructor(private procurementOrderService: ProcurementOrderService) {
        console.log('采购订单组件');
        this.procurementOrderService.getList(1);
    }

}

