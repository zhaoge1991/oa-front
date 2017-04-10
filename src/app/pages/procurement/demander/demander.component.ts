import {Component} from '@angular/core';
@Component({
    selector: 'procurement-demander',
    template: `<router-outlet></router-outlet>`
})
export class DemanderComponent {
    constructor() {
        console.log('采购需求方');
    }

}

