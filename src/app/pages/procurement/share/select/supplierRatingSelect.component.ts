import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {SupplierRatingService} from "../../../../services/core/supplier_ratingService/supplier_rating.service";

@Component({
    selector: 'supplier-rating-select',
    template: `<select (change)="onchange($event)" class="ng-form-control">
    <option value="0">未选择</option>
  <option *ngFor="let option of options" [value]="option['supplier_rating_id']" [selected]="option['supplier_rating_id']==value">{{option['name']}}</option>
</select>
`,
    styleUrls: []
})

export class SupplierRatingSelectComponent implements OnInit {
    @Input() value;
    @Output() valueChange = new EventEmitter();

    private options: any[];

    constructor(
        private supplierRatingService: SupplierRatingService,

    ) {}

    ngOnInit() {
        this.options = this.supplierRatingService.get();

    }

    onchange($event) {
        this.valueChange.emit($event.target.value - 0);
    }
}
