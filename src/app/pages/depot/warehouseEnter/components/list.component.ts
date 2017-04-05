import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {WarehouseEnterService} from "../../../../services/depot/warehouseEnter.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {MessageService} from "../../../../services/core/messageComponent.service";
import {Paginate} from "../../../../models/common/paginate";

import {WarehouseEnter} from "../../../../models/depot/warehouseEnter"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"


@Component({
    selector: 'depot-warehouse-enter',
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
})

export class ListComponent {
    private gridOptions: GridOptions;
    public showGrid: boolean;
    public warehouseEnters: WarehouseEnter[]=[];
    private columnDefs: any[];
    public selectedcolumnDefs: any[];
    public selectedWarehouseEnter: WarehouseEnter;
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
        private listservice: WarehouseEnterService,
        private quantifier: QuantifierService,
        private message: MessageService
    ) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};
        this.createRowData(1);
        this.createColumnDefs();
        this.showGrid = true;
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.openUrl = 'pages/depot/enter_order/detail';
        this.commonActionBarConfig.addNewUrl = 'pages/depot/enter_order/edit';
        this.commonActionBarConfig.deleteUrl = '/api/depot/enter_order/';
        this.commonActionBarConfig.editUrl = 'pages/depot/enter_order/edit';
        
        this.commonActionBarConfig.idName = 'warehouse_enter_id';
    }

    pageClick($event) {
        this.createRowData($event.text - 0);
        this.selectedWarehouseEnter = null;

    }


    //行配置项(获取数据)
    private createRowData(page) {
        this.listservice.getList(page)
            .subscribe(data => {
                this.paginate = data
                this.warehouseEnters = this.paginate.data
//                for(let warehouseEnter of this.paginate.data){
//                    
//                    console.log(warehouseEnter);
//                    this.warehouseEnters.push(new WarehouseEnter(warehouseEnter))
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
                headerName: '入库单编号',
                field: 'warehouse_enter_no',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '采购合同编号',
                field: 'procurement_order_no',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '入库时间',
                field: 'enter_date',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '入库商品数',
                field: 'products',
                width: 80,
                cellRenderer: (params) => {
                    let count = 0;

                    for (let entry of params.value) {
                        count += entry['quantity']
                    }
                    return count;
                },
                cellRendererParams: {
                    property: 'name'
                },
            },
            {
                headerName: '入库人',
                field: 'user',
                cellRenderer: (params) => {
                    return params.value.name;
                },
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
            this.selectedWarehouseEnter = $event.node.data as WarehouseEnter;
            this.selectedIndex = $event.node.rowIndex;
            //产品清单数据
            this.proData = this.selectedWarehouseEnter.products;
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
        this.router.navigate(['pages/depot/enter_order/detail/', $event.data.warehouse_enter_id])
    }

    objectChange(warehouseEnter: WarehouseEnter) {
        let selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes)
        this.gridOptions.api.insertItemsAtIndex(this.selectedIndex, [warehouseEnter]);
    }

    objectDelete(b: boolean) {
        this.listservice.delete(this.selectedWarehouseEnter).subscribe(data => {
            let selectedNodes = this.gridOptions.api.getSelectedNodes();
            this.gridOptions.api.removeItems(selectedNodes);
            this.selectedWarehouseEnter=null;
        });
    }



}
