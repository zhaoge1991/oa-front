import {Component, ViewChild, ViewEncapsulation, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {ProcurementDemander} from "../../../../models/procurement/procurementDemander";
import {GridOptions} from "ag-grid/main";
import {Paginate} from "../../../../models/common/paginate";
import {ProcurementDemanderService} from "../../../../services/procurement/procurementDemander.service"
import {Bank} from "../../../../models/common/finance/bank"

@Component({
    selector: 'demander-bank-select',
    template: `
    <select  class="ng-form-control" (change)="onChange($event.target.selectedIndex)" >
  <option *ngFor="let bank of procurementDemander?.banks" [value]="bank.bank_id">{{bank.bank_name}}</option>
</select>
    `,
    providers: [ProcurementDemanderService]
})

export class DemanderBankSelectComponent implements OnInit, OnChanges {
    @Input() procurementDemanderId: number;
    @Output() onBankChange = new EventEmitter<Bank>();
    private procurementDemander: ProcurementDemander;
    private bank:Bank;
    
    constructor(private procurementDemanderService: ProcurementDemanderService) {
        this.procurementDemander = new ProcurementDemander(null);
    }
    ngOnInit() {
        
        this.getData(this.procurementDemanderId);
    }

    getData(procurementDemanderId: number) {
        this.procurementDemanderService.getDetail(procurementDemanderId).subscribe(data => {
            this.procurementDemander = data as ProcurementDemander;
            if (this.procurementDemander&&this.procurementDemander.banks){
                this.onBankChange.emit(this.procurementDemander.banks[0])
            }else{
                 this.onBankChange.emit(new Bank(null))
            }
        })
    }

    onChange(index: number) {
        this.onBankChange.emit(this.procurementDemander.banks[index])
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['procurementDemanderId'].currentValue != changes['procurementDemanderId'].previousValue) {
            this.getData(changes['procurementDemanderId'].currentValue);
        }
    }

}
