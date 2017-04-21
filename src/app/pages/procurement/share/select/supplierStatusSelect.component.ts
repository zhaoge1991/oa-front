import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {SupplierStatusService} from "../../../../services/core/supplier_statusServices/supplier_status.service";

@Component({
    selector: 'supplier-status-select',
    template: `<select (change)="onchange($event)" class="ng-form-control">
    <option value="0">未选择</option>
  <option *ngFor="let option of options" [value]="option['supplier_status_id']" [selected]="option['supplier_status_id']==value">{{option['name']}}</option>
</select>
`,
    styleUrls: []
})

export class SupplierStatusSelectComponent implements OnInit {
    @Input() value;
    @Output() valueChange = new EventEmitter();

    private options: any[];

    constructor(
        private supplierStatusService: SupplierStatusService,

    ) {}

    ngOnInit() {
        this.options = this.supplierStatusService.get();

    }

    onchange($event) {
        this.valueChange.emit($event.target.value - 0);
    }
}
