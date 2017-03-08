import {Component} from '@angular/core';
import {OrderService} from '../../../services/order/order.service'
@Component({
    selector: 'procurement-procurement-order',
    template: `<strong>procurement_order</strong><router-outlet></router-outlet>`
})
export class ProcurementOrderComponent {
    constructor(private orderService: OrderService) {
        console.log('采购订单组件');
        this.orderService.getOrders(1).subscribe(
            heroes => heroes,
            error => <any> error);
    }

}

