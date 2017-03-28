import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {FreezeOrderService} from "../../../../services/procurement/freezeOrder.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {MessageService} from "../../../../services/core/messageComponent.service";
import {Paginate} from "../../../../models/common/paginate";

import {FreezeOrder} from "../../../../models/procurement/freezeOrder"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"


@Component({
    selector: 'procurement-freeze-order-list',
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
})

export class ListComponent {
    private gridOptions: GridOptions;
    public showGrid: boolean;
    public freezeOrders: FreezeOrder[];
    public selectedFreezeOrder: FreezeOrder;
    public isbatches: boolean = false;
    public companyData: any;
    public demanderData: any;
    public collection: any[] = [1];
    //翻页配置
    private paginate: Paginate;
    private selectedIndex: number;
    private commonActionBarConfig: CommonActionBarConfig;
    
    private selectedcolumnDefs = [
                {
                    headerName: '产品id',
                    field: 'product_id',
                    width: 90,
                },
                {
                    headerName: '产品型号',
                    field: 'product',
                    cellRenderer: (params) => {
                        return params.value.model;
                    },
                    width: 160,
                },
                {
                    headerName: '中文描述',
                    field: 'product',
                    cellRenderer: (params) => {
                        return params.value.product_description[0].name;
                    },
                    width: 480,
                },
                {
                    headerName: '数量',
                    field: 'quantity',
                    width: 60,
                }
            ];
    private columnDefs = [
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
                headerName: '冻结库存单编号',
                field: 'procurement_freeze_no',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '冻结时间',
                field: 'date_added',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '冻结商品数量',
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
                headerName: '状态',
                field: 'status',
                width: 80,
                cellRenderer: (params) => {
                    if (params.value == 1) {
                        return '已出库';
                    } else {
                        return '未出库';
                    }

                },
            },
            {
                headerName: '冻结人',
                field: 'user',
                cellRenderer: (params) => {
                    return params.value.name;
                },
                width: 120,
            },

            {
                headerName: '备注',
                field: 'remark',
                width: 120
            }
        ];
    constructor(
        private router: Router,
        private listservice: FreezeOrderService,
    ) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};
        this.createRowData(1);
        this.showGrid = true;
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.deleteUrl = 'pages/procurement/freeze_order';
        this.commonActionBarConfig.openUrl = 'pages/procurement/freeze_order/detail';
        this.commonActionBarConfig.idName = 'procurement_freeze_id';
        this.commonActionBarConfig.editUrl = 'pages/procurement/freeze_order/edit';

    }

    pageClick($event) {
        this.createRowData($event.text - 0);
        this.selectedFreezeOrder = null;

    }


    //行配置项(获取数据)
    private createRowData(page) {
        this.listservice.getList(page)
            .then(data => {
                this.paginate = data
                this.freezeOrders = this.paginate.data as FreezeOrder[]
                console.log(this.freezeOrders);
            })
    }

    

    private onRowSelected($event) {
        if ($event.node.selected) {
            this.selectedFreezeOrder = $event.node.data as FreezeOrder;
        }
    }
    //双击列表单元格操作
    onCellDoubleClicked($event) {
        this.router.navigate(['pages/procurement/freeze_order/detail/', $event.data.procurement_freeze_id])
    }
    
    objectDelete(b: boolean) {
        this.listservice.delete(this.selectedFreezeOrder).subscribe(data => {
            let selectedNodes = this.gridOptions.api.getSelectedNodes();
            this.gridOptions.api.removeItems(selectedNodes);
            this.selectedFreezeOrder = null;
        });
    }



}
