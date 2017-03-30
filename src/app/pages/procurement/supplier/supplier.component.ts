import {Component} from '@angular/core';
@Component({
    selector: 'procurement-supplier',
    template: `<router-outlet></router-outlet>`
})
export class SupplierComponent {
    constructor() {
        console.log('采购供应商');
    }

}

