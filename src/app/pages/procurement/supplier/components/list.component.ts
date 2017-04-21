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
    selector: 'procurement-supplier-list',
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
})

export class ListComponent {
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
    public selectedcolumnProductDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {
            headerName: '产品名称',
            field: 'product_category',
            width: 150,
        },
        {
            headerName: '备注',
            field: 'remark',
            width: 300,
        }
    ];
    public selectedcolumnBankDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {
            headerName: '账户',
            field: 'bank_no',
            width: 180,
            editable: true,
        },
        {
            headerName: '开户银行全称',
            field: 'bank_name',
            width: 150,
        },
        {
            headerName: '收款人',
            field: 'payee',
            width: 150,
        }
        ,
        {
            headerName: '账户类别',
            field: 'type',
            width: 150,
        }
        ,
        {
            headerName: '备注',
            field: 'remark',
            width: 150,
        }
    ];
    public selectedcolumnContactDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {
            headerName: '联系人',
            field: 'name',
            width: 150,
        },
        {
            headerName: '职位',
            field: 'position',
            width: 80,
        }
        ,
        {
            headerName: '称谓',
            field: 'appellation',
            width: 80,
        }
        ,
        {
            headerName: '性别',
            field: 'sex',
            width: 80,
        }
        ,
        {
            headerName: '所属部门',
            field: 'department',
            width: 80,
        }
        ,
        {
            headerName: '公司电话',
            field: 'phone',
            width: 80,
        }
        ,
        {
            headerName: '个人手机',
            field: 'mobile',
            width: 80,
        }
        ,
        {
            headerName: '传真',
            field: 'fax',
            width: 80,
        },
        {
            headerName: 'QQ',
            field: 'QQ',
            width: 80,
        }
    ];
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
                headerName: '城市',
                field: 'city',
                width: 80,
            },
            {
                headerName: '地址',
                field: 'add',
                width: 240
            },
            {
                headerName: '电话',
                field: 'tel',
                width: 120
            },
            {
                headerName: '传真',
                field: 'fax',
                width: 120
            },
            {
                headerName: '备注',
                field: 'remark',
                width: 240
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
        this.router.navigate(['pages/procurement/supplier/edit/', $event.data.procurement_supplier_id])
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
