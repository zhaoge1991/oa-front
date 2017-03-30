import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {ProcurementSupplierService} from "../../../../services/procurement/procurementSupplier.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {Paginate} from "../../../../models/common/paginate";

import {ProcurementSupplier} from "../../../../models/procurement/procurementSupplier"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {AgGridLevelPipeComponent} from "../../../../modules/agGrid/procurement/supplier/agGridLevelPipe.component";
import {AgGridStatusPipeComponent} from "../../../../modules/agGrid/procurement/supplier/agGridStatusPipe.component";

@Component({
    selector: 'procurement-supplier-analysis',
    templateUrl: './analysis.html',
    styleUrls: ['./analysis.scss']
})

export class AnalysisComponent {
    private gridOptions: GridOptions;
    public showGrid: boolean;
    public suppliers: ProcurementSupplier[];
    private columnDefs: any[];
    public selectedProcurementSupplier: ProcurementSupplier;
    public isbatches: boolean = false;
    private listdata: any[];
    public companyData: any;
    public demanderData: any;
    public collection: any[] = [1];
    //翻页配置
    private paginate: Paginate;
    private selectedIndex: number;
    private commonActionBarConfig: CommonActionBarConfig;
    
    constructor(
        private router: Router,
        private listservice: ProcurementSupplierService,
        private currency: CurrencyService,
    ) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};
        this.createRowData(1);
        this.createColumnDefs();
        this.showGrid = true;
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.addNewUrl = 'pages/procurement/supplier/edit';
        this.commonActionBarConfig.deleteUrl = 'pages/procurement/upplier';
        this.commonActionBarConfig.idName = 'procurement_supplier_id';
        this.commonActionBarConfig.editUrl = 'pages/procurement/supplier/edit';
    }

    pageClick($event) {
        this.createRowData($event.text - 0);
        this.selectedProcurementSupplier = null;

    }


    //行配置项(获取数据)
    private createRowData(page) {
        this.listservice.getList(page)
            .subscribe(data => {
                this.paginate = data
                this.suppliers = this.paginate.data;
            })
    }

    //列配置项
    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: ' ', field: ' ', width: 30, checkboxSelection: true, suppressSorting: true,
                suppressMenu: true, pinned: true, hide: true
            },
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
                pinned: true //固定列
            },
            {
                headerName: '供应商简称',
                field: 'simple_name',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '供应商状态',
                field: 'supplier_status_id',
                width: 120,
                cellRendererFramework: AgGridStatusPipeComponent,
               
            },
            {
                headerName: '供应商等级',
                field: 'supplier_level_id',
                cellRendererFramework: AgGridLevelPipeComponent,
                width: 120,
            },
            {
                headerName: '供应商账期',
                field: 'account_of',
                width: 120,
                editable: false, //是否可双击编辑
            },
            {
                headerName: '累计采购次数',
                field: 'procurement_order_count',
                width: 80,
            },
            {
                headerName: '累计采购金额',
                field: 'procurement_price',
                width: 80
            },
            {
                headerName: '延误交期次数',
                field: 'delay_count',
                width: 80
            },
            {
                headerName: '客诉次数',
                field: '',
                width: 80
            },
            {
                headerName: '退货次数',
                field: '',
                width: 80
            }
        ];
    }
    private onRowSelected($event) {
        if ($event.node.selected) {
            this.selectedProcurementSupplier = $event.node.data as ProcurementSupplier;
            this.selectedIndex = $event.node.rowIndex;

        }
    }
    //双击列表单元格操作
    onCellDoubleClicked($event) {
        this.router.navigate(['pages/procurement/procurement_order/detail/', $event.data.procurement_order_id])
    }

    objectChange(procurementSupplier: ProcurementSupplier) {
        let selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes)
        this.gridOptions.api.insertItemsAtIndex(this.selectedIndex, [procurementSupplier]);
    }

    objectDelete(b: boolean) {
        this.listservice.delete(this.selectedProcurementSupplier).subscribe(data => {
            let selectedNodes = this.gridOptions.api.getSelectedNodes();
            this.gridOptions.api.removeItems(selectedNodes);
            this.selectedProcurementSupplier = null;
        });
    }



}
