import {Component, ViewChild, ViewEncapsulation, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {ProcurementSupplier} from "../../../../models/procurement/procurementSupplier";
import {GridOptions} from "ag-grid/main";
import {Paginate} from "../../../../models/common/paginate";
import {ProcurementSupplierService} from "../../../../services/procurement/procurementSupplier.service"
import {Bank} from "../../../../models/common/finance/bank"

@Component({
    selector: 'supplier-bank-select',
    template: `
    <select  class="ng-form-control" (change)="onChange($event.target.selectedIndex)" >
  <option *ngFor="let bank of procurementSupplier?.banks" [value]="bank.bank_id">{{bank.bank_name}}</option>
</select>
    `,
    providers: [ProcurementSupplierService]
})

export class SupplierBankSelectComponent implements OnInit, OnChanges {
    @Input() procurementSupplierId: number;
    @Output() onBankChange = new EventEmitter<Bank>();
    private procurementSupplier: ProcurementSupplier;
    private bank:Bank;
    
    constructor(
        private procurementSupplierService: ProcurementSupplierService,
    ) {
        this.procurementSupplier = new ProcurementSupplier();
    }
    ngOnInit() {
        this.getData(this.procurementSupplierId);
    }

    getData(procurementSupplierId: number) {
        this.procurementSupplierService.getDetail(procurementSupplierId).subscribe(data => {
            this.procurementSupplier = data as ProcurementSupplier;
            
            if (this.procurementSupplier&&this.procurementSupplier.banks){
                this.onBankChange.emit(this.procurementSupplier.banks[0])
            }else{
                 this.onBankChange.emit(new Bank(null))
            }
        })
    }

    onChange(index: number) {
        this.onBankChange.emit(this.procurementSupplier.banks[index])
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['procurementSupplierId'].currentValue != changes['procurementSupplierId'].previousValue) {
            this.getData(changes['procurementSupplierId'].currentValue);
        }
    }

}
