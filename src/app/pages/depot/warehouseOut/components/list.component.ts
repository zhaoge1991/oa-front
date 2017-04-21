import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {WarehouseOutService} from "../../../../services/depot/warehouseOut.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {MessageService} from "../../../../services/core/messageComponent.service";
import {Paginate} from "../../../../models/common/paginate";

import {WarehouseOut} from "../../../../models/depot/warehouseOut"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"


@Component({
    selector: 'depot-warehouse-out',
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
})

export class ListComponent {
    private gridOptions: GridOptions;
    public showGrid: boolean;
    public warehouseOuts: WarehouseOut[]=[];
    private columnDefs: any[];
    public selectedcolumnDefs: any[];
    public selectedWarehouseOut: WarehouseOut;
    public isbatches: boolean = false;
    public companyData: any;
    public demanderData: any;
    public collection: any[] = [1];
    //翻页配置
    private paginate: Paginate;
    private selectedIndex: number;


    //选中行列表行配置
    private proData;
    

    private commonActionBarConfig: CommonActionBarConfig;

    constructor(
        private router: Router,
        private listservice: WarehouseOutService,
        private quantifier: QuantifierService,
        private message: MessageService
    ) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};
        this.createRowData(1);
        this.createColumnDefs();
        this.showGrid = true;
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.openUrl = 'pages/depot/out_order/detail';
        this.commonActionBarConfig.addNewUrl = 'pages/depot/out_order/edit';
        this.commonActionBarConfig.deleteUrl = '/api/depot/out_order/';
        this.commonActionBarConfig.editUrl = 'pages/depot/out_order/edit';
        
        this.commonActionBarConfig.idName = 'warehouse_out_id';
    }

    pageClick($event) {
        this.createRowData($event.text - 0);
        this.selectedWarehouseOut = null;

    }


    //行配置项(获取数据)
    private createRowData(page) {
        this.listservice.getList(page)
            .subscribe(data => {
                this.paginate = data
                this.warehouseOuts = this.paginate.data
//                for(let warehouseOut of this.paginate.data){
//                    
//                    console.log(warehouseOut);
//                    this.warehouseOuts.push(new WarehouseOut(warehouseOut))
//                }
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
                headerName: '出库单编号',
                field: 'warehouse_out_no',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '订单',
                field: 'order_no',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '国家',
                field: 'country_name',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: 'PI',
                field: 'contract_no',
                width: 80,
            },
            {
                headerName: '出库日期',
                field: 'out_date',
                width: 80,
            },
            {
                headerName: '出库人',
                field: 'user',
                 cellRenderer: (params) => {
                    return params.value.name;
                },
                width: 80,
            },
            {
                headerName: '领料人',
                field: 're_user_name',
                width: 80,
            },
            {
                headerName: '备注',
                field: 'remark',
                width: 240,
            },
            
        ];
    }

    private onRowSelected($event) {
        if ($event.node.selected) {
            this.selectedWarehouseOut = $event.node.data as WarehouseOut;
            this.selectedIndex = $event.node.rowIndex;
            //产品清单数据
            this.proData = this.selectedWarehouseOut.products;
            this.selectedcolumnDefs = [
                {
                    headerName: '产品id',
                    field: 'product_id',
                    width: 90,
                },
                {
                    headerName: '产品型号',
                    field: 'model',
                    width: 160,
                },
                {
                    headerName: '中文描述',
                    field: 'zh_name',
                    width: 480,
                },
                {
                    headerName: '英文描述',
                    field: 'en_name',
                    width: 480,
                },
                {
                    headerName: '单位',
                    field: 'quantifier_id',
                    width: 60,
                    cellRenderer: (params) => {
                        let data = params.value;
                        if (data) {
                            let quantifierdata = this.quantifier.get(data);
                            return quantifierdata[params.property];
                        } else return '';
                    },
                    cellRendererParams: {
                        property: 'code'
                    },
                },
                {
                    headerName: '数量',
                    field: 'quantity',
                    width: 60,
                }
               
            ];
        }
    }
    //双击列表单元格操作
    onCellDoubleClicked($event) {
        this.router.navigate(['pages/depot/out_order/detail/', $event.data.warehouse_out_id])
    }

    objectChange(warehouseOut: WarehouseOut) {
        let selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes)
        this.gridOptions.api.insertItemsAtIndex(this.selectedIndex, [warehouseOut]);
    }

    objectDelete(b: boolean) {
        this.listservice.delete(this.selectedWarehouseOut).subscribe(data => {
            let selectedNodes = this.gridOptions.api.getSelectedNodes();
            this.gridOptions.api.removeItems(selectedNodes);
            this.selectedWarehouseOut=null;
        });
    }



}
