import {Component, ViewChild, ViewEncapsulation, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {ProcurementDemanderService} from "../../../../services/procurement/procurementDemander.service";
import {ProcurementDemander} from "../../../../models/procurement/procurementDemander";
import {GridOptions} from "ag-grid/main";
import {Paginate} from "../../../../models/common/paginate";

@Component({
    selector: 'demander-select',
    templateUrl: './demanderSelect.html',
    styleUrls: ['./demanderSelect.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ProcurementDemanderService]
})

export class DemanderSelectComponent implements OnInit {
    private procurementDemanders: ProcurementDemander[];
    @Output() onDemanderChange = new EventEmitter<ProcurementDemander>();
    @Input() inputProcurementDemander:ProcurementDemander;
    private selectedProcurementDemander:ProcurementDemander
    constructor(
        private procurementDemanderService: ProcurementDemanderService,
    ) {
    }

    ngOnInit() {
        this.setList('', 1);
    }

    setList(key: string, page: number) {
        this.procurementDemanderService.getList(page).subscribe(data => {
            this.procurementDemanders = data as ProcurementDemander[];
        })
    }
    change(index:number) {
        this.selectedProcurementDemander = this.procurementDemanders[index];
        this.onDemanderChange.emit(this.procurementDemanders[index]);
    }
}
