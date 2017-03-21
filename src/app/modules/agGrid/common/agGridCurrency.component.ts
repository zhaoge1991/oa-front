import {Component, ViewContainerRef, ViewChild, AfterViewInit} from '@angular/core';
import {ICellEditorAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'ag-grid-editor-cell-currency',
    template: `
        <ng-select [selectfor]="'quantifier_id'" [showname]="'code'" [(value)]="params.value"></ng-select>
    `,
   
})
export class AgGridCurrencyComponent implements ICellEditorAngularComp {
    private params: any;
    agInit(params: any): void {
        this.params = params;
    }
    getValue(): any {
        return this.params.value;
    }

    
}