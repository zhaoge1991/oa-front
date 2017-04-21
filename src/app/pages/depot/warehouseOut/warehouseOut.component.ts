import {Component} from '@angular/core';
import {WarehouseOutService} from '../../../services/depot/warehouseOut.service'
@Component({
    selector: 'depot-warehouse-enter',
    template: `<router-outlet></router-outlet>`
})
export class WarehouseOutComponent {
    constructor(private enterOrderService: WarehouseOutService) {
        console.log('出库单组件');
        this.enterOrderService.getList(1);
    }

}

