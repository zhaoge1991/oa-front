import {Component, ViewChild, ViewEncapsulation, OnInit,EventEmitter,Output,Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {ProcurementSupplierService} from "../../../../services/procurement/procurementSupplier.service";
import {ProcurementSupplier} from "../../../../models/procurement/procurementSupplier";
import {AgGridDegreePipeComponent} from "../../../../modules/agGrid/procurement/supplier/agGridDegreePipe.component";
import {AgGridLevelPipeComponent} from "../../../../modules/agGrid/procurement/supplier/agGridLevelPipe.component";
import {AgGridRatingPipeComponent} from "../../../../modules/agGrid/procurement/supplier/agGridRatingPipe.component";
import {AgGridStatusPipeComponent} from "../../../../modules/agGrid/procurement/supplier/agGridStatusPipe.component";
import {GridOptions} from "ag-grid/main";
import {Paginate} from "../../../../models/common/paginate";
@Component({
    selector: 'supplier-select',
    templateUrl: './supplierSelect.html',
    styleUrls: ['./supplierSelect.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ProcurementSupplierService]
})

export class SupplierSelectComponent implements OnInit {
    //弹出列表框
    @ViewChild('supplierDialog') supplierDialog: ModalDirective;
    @ViewChild('selectedrow') selectedrow: GridOptions;
    @Output() onSupplierChange = new EventEmitter<ProcurementSupplier>();
    @Input() procurementSupplier:ProcurementSupplier;
    @Input() disabled;
    private selectProcurementSupplier: ProcurementSupplier;

    private procurementSuppliers: ProcurementSupplier[]

    private paginate: Paginate;
    private isselected: boolean = false;
    //列表列定义
    private columnDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {
            headerName: '供应商全称',
            field: 'full_name',
            width: 120,
            pinned: true
        },
        {
            headerName: '简称',
            field: 'simple_name',
            width: 60,
            pinned: true
        },
        {
            headerName: '状态',
            field: 'supplier_status_id',
            cellRendererFramework: AgGridStatusPipeComponent,
            width: 60
        },
        {
            headerName: '等级',
            field: 'supplier_level_id',
            cellRendererFramework: AgGridLevelPipeComponent,
            width: 60,

        },
        {
            headerName: '程度',
            field: 'supplier_degree_id',
            cellRendererFramework: AgGridDegreePipeComponent,
            width: 60
        },
        {
            headerName: '评分',
            field: 'supplier_rating_id',
            cellRendererFramework: AgGridRatingPipeComponent,
            width: 60
        },
        {
            headerName: '城市',
            field: 'city',
            width: 60,
        },
        {
            headerName: '电话',
            field: 'tel',
            width: 90,
        },
        {
            headerName: '传真',
            field: 'fax',
            width: 90,
        },
        {
            headerName: '地址',
            field: 'add',
            width: 150,
        },
        {
            headerName: '备注',
            field: 'remark',
            width: 150
        }

    ];
    //搜索
    private searchtext = '';

    constructor(
        private procurementSupplierService: ProcurementSupplierService,
    ) {
    }

    ngOnInit() {
        console.log(999, this.procurementSupplier)
        
        this.setList('', 1);
    }

    /**
     * 设置主要列表数据
     */
    setList(key: string, page: number) {
        this.procurementSupplierService.getList(page).subscribe(data => {
            this.paginate = data as Paginate;
            this.procurementSuppliers = this.paginate.data as ProcurementSupplier[];
        })
    }


    show() {
        this.supplierDialog.show();
    }

    hide() {
        console.log(this.supplierDialog);
        this.supplierDialog.hide();
    }

    //点击翻页
    pageClick($event) {
        this.isselected = false;
        this.setList(this.searchtext, $event.text);
    }


    search($event) {
        this.isselected = false;
        this.searchtext = $event;
        this.setList(this.searchtext, 1);
    }


    onRowSelected($event) {

    }
    selectSupplier() {
        if (this.selectedrow.api.getSelectedRows().length >= 1) {
            this.selectProcurementSupplier = this.selectedrow.api.getSelectedRows()[0] as ProcurementSupplier;
        }
        this.procurementSupplier = this.selectProcurementSupplier ;
        this.onSupplierChange.emit(this.selectProcurementSupplier);
        this.supplierDialog.hide();
    }
}
