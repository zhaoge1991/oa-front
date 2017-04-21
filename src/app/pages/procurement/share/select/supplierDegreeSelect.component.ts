import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {SupplierDegreeService} from "../../../../services/core/supplier_degreeService/supplier_degree.service";

@Component({
    selector: 'supplier-degree-select',
    template: `<select (change)="onchange($event)" class="ng-form-control">
    <option value="0">未选择</option>
  <option *ngFor="let option of options" [value]="option['supplier_degree_id']" [selected]="option['supplier_degree_id']==value">{{option['name']}}</option>
</select>
`,
    styleUrls: []
})

export class SupplierDegreeSelectComponent implements OnInit {
    @Input() value;
    @Output() valueChange = new EventEmitter();

    private options: any[];

    constructor(
        private supplierDegreeService: SupplierDegreeService,

    ) {}

    ngOnInit() {
        this.options = this.supplierDegreeService.get();

    }

    onchange($event) {
        this.valueChange.emit($event.target.value - 0);
    }
}
