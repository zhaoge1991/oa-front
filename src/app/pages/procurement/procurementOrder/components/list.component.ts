import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {AllConfigService} from "../../../../services/core/allConfig.service";
import {ProcurementOrderService} from "../../../../services/procurement/procurementOrder.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {MessageService} from "../../../../services/core/messageComponent.service";
import {ActionBar} from "../../../../theme/oa-them/components/actionBar/actionBar.component";
import {Paginate} from "../../../../models/common/paginate";

import {ProcurementOrder} from "../../../../models/procurement/procurementOrder"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"


@Component({
    selector: 'procurement-procurement-order-list',
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
})

export class ListComponent {
    private gridOptions: GridOptions;
    public showGrid: boolean;
    public procurementOrders: ProcurementOrder[];
    private columnDefs: any[];
    private selectedeRow: boolean;
    public selectedcolumnDefs: any[];
    public selectedProcurementOrder: ProcurementOrder;
    public isbatches: boolean = false;
    private listdata: any[];
    public companyData: any;
    public demanderData: any;
    public collection: any[] = [1];
    //翻页配置
    private paginate: Paginate;
    //按钮组配置
    private actionConfig = {
        showbtn: {open: true, add: true, edit: true, action: true, export: true, annex: true, delete: true},
        openurl: 'pages/procurement/procurement_order/detail',
        addurl: 'pages/procurement/procurement_order/edit',
        idname: 'procurement_order_id'
    }
    //操作组配置
    private operat: {
        toship?: boolean,
        orderdemand?: boolean,
        supaudit?: boolean,
        financeaudit?: boolean,
        procurement?: boolean,
        toshipment?: boolean,
        cusrecive?: boolean,
        procurementcheck?: boolean,
        isdone?: boolean
    } = {};


    //选中行列表行配置
    private proData;
    private ordercostData;
    private ordercostCol = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {headerName: '费用名称', field: 'name', width: 240},
        {headerName: '费用金额', field: 'price', width: 240}
    ];
    
    
    private commonActionBarConfig:CommonActionBarConfig;

    constructor(
        private router: Router,
        private configservice: AllConfigService,
        private listservice: ProcurementOrderService,
        private payment: PaymentService,
        private currency: CurrencyService,
        private quantifier: QuantifierService,
        private appconfig: AppconfigService,
        private message: MessageService
    ) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};
        this.createRowData(1);
        this.createColumnDefs();
        this.showGrid = true;
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.addNewUrl = 'pages/procurement/procurement_order/edit';
        this.commonActionBarConfig.openUrl = 'pages/procurement/procurement_order/detail';
        this.commonActionBarConfig.idName = 'procurement_order_id';
        this.commonActionBarConfig.editUrl = 'pages/procurement/procurement_order/edit';
        this.commonActionBarConfig.isProcurementOrder=true;
    }

    pageClick($event) {
        this.createRowData($event.text - 0);
        this.selectedeRow = false;
        this.selectedProcurementOrder = null;
        
    }


    //行配置项(获取数据)
    private createRowData(page) {
        this.listservice.getList(page)
            .then(data => {
                this.paginate = data
                this.procurementOrders = this.paginate.data;
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
                headerName: '采购单编号',
                field: 'procurement_contact_no',
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '采购单状态',
                field: 'status',
                cellRenderer: (params) => {
                    if (params.value == 1) {
                        return '已采购';
                    } else if (params.value == 2) {
                        return '已到货';
                    } else if (params.value == 3) {
                        return '已完成';
                    } else {
                        return '未采购';
                    }

                },
                width: 120,
                pinned: true //固定列
            },
            {
                headerName: '采购商品数量',
                field: 'procurement_order_product',
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
                headerName: '货币',
                field: 'currency_id',
                width: 80,
                cellRenderer: (params) => {
                    let data = params.value;
                    if (data) {
                        let status = this.currency.get(data);

                        if (status) {return status['code']} else return '';
                    } else return '';
                },
            },
            {
                headerName: '采购总金额',
                field: 'price',
                width: 120,
            },
            {
                headerName: '供应商',
                field: 'company',
                width: 120,
                editable: false, //是否可双击编辑
                cellRenderer: (params) => {
                    let data = params.value;

                    if (data) {
                        return data['full_name'];
                    } else return '';

                },
            },
            {
                headerName: '采购员',
                field: 'user',
                width: 80,
                cellRenderer: (params) => {
                    let data = params.value;

                    if (data) {
                        return data['name'];
                    } else return '';
                },
                cellRendererParams: {
                    property: 'name'
                }
            },
            {
                headerName: '采购日期',
                field: 'date_added',
                width: 120
            },
            {
                headerName: '预计到货日期',
                field: 'date_delivery',
                width: 120
            },
            {
                headerName: '实际到货日期',
                field: 'date_real',
                width: 120
            }
        ];
    }

    private onRowSelected($event) {
        if ($event.node.selected) {
            this.selectedProcurementOrder = $event.node.data as ProcurementOrder;
            //产品清单数据
            this.proData = this.selectedProcurementOrder.procurement_order_product;
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
                },
                {
                    headerName: '实际销售单价',
                    field: 'price',
                    width: 90,
                },
                {
                    headerName: '实际销售金额',
                    field: 'total',
                    width: 90,
                },
                {
                    headerName: '指导价',
                    field: 'reference_price',
                    width: 90,
                }
            ];

            //订单类型判断
            this.operat = {toship: true, orderdemand: true};


            this.selectedeRow = true;
        }
    }



    //搜索框搜索和回车事件
    public onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.value);
    }
    public onQuickFilterEnter($event) {
        if ($event.keyCode === 13) {
            this.gridOptions.api.setQuickFilter($event.target.value);
        }
    }

    //双击列表单元格操作
    onCellDoubleClicked($event) {
        this.router.navigate(['pages/procurement/procurement_order/detail/', $event.data.procurement_order_id])
    }

    //测试操作
    @ViewChild('actionBar') actionbar: ActionBar;
    testclick() {
        this.actionbar.supauditclick();
    }
    testclick2($event) {
        alert($event);
    }

    //保存操作
    saveData() {
        console.log('保存')
    }
    //删除操作
    deleteData() {
        let r = confirm('确认删除？')
        if (r) {
            this.listservice.delete(this.selectedProcurementOrder.procurement_order_id).subscribe(data => {
                console.log(565656, data);
                if (data.error) {
                    this.message.putMessage({
                        severity: 'error',
                        summary: data.error,
                        detail: data.error_description
                    })
                }
                this.selectedProcurementOrder = null;
                this.createRowData(1);
            })

        }
    }
}
