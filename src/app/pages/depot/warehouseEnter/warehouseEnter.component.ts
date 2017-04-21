import {Component} from '@angular/core';
import {WarehouseEnterService} from '../../../services/depot/warehouseEnter.service'
@Component({
    selector: 'depot-warehouse-enter',
    template: `<router-outlet></router-outlet>`
})
export class WarehouseEnterComponent {
    constructor(private enterOrderService: WarehouseEnterService) {
        console.log('入库单组件');
        this.enterOrderService.getList(1);
    }

}

