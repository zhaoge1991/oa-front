import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'procurement-supplier-degree-cell',
    template: `{{params.value | supplierRatingPipe}}`
})
export class AgGridRatingPipeComponent implements ICellRendererAngularComp {
    public params:any;

    agInit(params:any):void {
        this.params = params;
    }
}