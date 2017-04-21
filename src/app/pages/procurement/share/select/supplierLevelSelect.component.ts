import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {SupplierLevelService} from "../../../../services/core/supplier_levelService/supplier_level.service";

@Component({
    selector: 'supplier-level-select',
    template: `<select (change)="onchange($event)" class="ng-form-control">
    <option value="0">未选择</option>
  <option *ngFor="let option of options" [value]="option['supplier_level_id']" [selected]="option['supplier_level_id']==value">{{option['name']}}</option>
</select>
`,
    styleUrls: []
})

export class SupplierLevelSelectComponent implements OnInit {
    @Input() value;
    @Output() valueChange = new EventEmitter();

    private options: any[];

    constructor(
        private supplierLevelService: SupplierLevelService,

    ) {}

    ngOnInit() {
        this.options = this.supplierLevelService.get();

    }

    onchange($event) {
        this.valueChange.emit($event.target.value - 0);
    }
}
