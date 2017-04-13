import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {GridOptions} from 'ag-grid/main';
import {ProductListService} from "../../../../services/product/productList/product_list.service";
import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {Paginate} from "../../../../models/common/paginate";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";


@Component({
    selector: 'depot-inventory-turnover',
    templateUrl: './turnover.html',
    styleUrls: ['./turnover.scss']
})

export class TurnoverComponent {
    private gridOptions: GridOptions;
    public rowData: any[];
    public selectedrowData: any;
    public isbatches: boolean = false;
    //翻页配置
    private paginate: Paginate;
    private selectedIndex: number;
    private searchtext: string = '';
    private actionConfig: CommonActionBarConfig;
    public columnDefs = [
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
            headerName: '产品id',
            field: 'product.product_id',
            width: 180,
            pinned: true //固定列
        },
        {
            headerName: '产品型号',
            field: 'product.model',
            width: 120,
            pinned: true //固定列
        },
        {
            headerName: '商品分类',
            field: 'product.catalog',
            cellRenderer: (params) => {
                let config = this.appconfig.get('localisation.language.default');
                if (!params.value) return '';
                if(params.value.catalog_description){
                    for (let i = 0; i < params.value.catalog_description.length; i++) {
                        if (params.value.catalog_description[i].language_id = config) {
                            return params.value.catalog_description[i].name;
                        }
                    }
                }
            },
            width: 120
        },
        {
            headerName: '中文描述',
            field: 'product.product_description',
            width: 240,
            cellRenderer: (params) => {
                let cn = this.appconfig.get('localisation.language.chinese');
                for (let i = 0; i < params.value.length; i++) {
                    if (params.value[i].language_id == cn) {
                        return params.value[i].name;
                    }
                }
            }
        },
        {
            headerName: '库存数',
            field: 'product.quantity',
            width: 150,
        },
        {
            headerName: '出货次数',
            field: 'count_frequency',
            width: 120,
        },
        {
            headerName: '出货数量',
            field: 'count_quantity',
            width: 120,
        }
    ];;
    public selectedColumnSaleDefs = [
        {
            headerName: '订单编号',
            field: 'p_order.order_no',
            width: 120,
        },
        {
            headerName: '销售时间',
            field: 'p_order.date_added',
            width: 90,
        },
        {
            headerName: '产品名',
            field: 'zh_name',
            width: 480,
        },
        {
            headerName: '销售型号',
            field: 'model',
            width: 80,
        },
        {
            headerName: '数量',
            field: 'quantity',
            width: 90,
        },
        {
            headerName: '货币',
            field: 'p_order.currency_id',
            width: 90,
            cellRenderer: (params) => {
                let data = params.value;
                if (data) {
                    let status = this.currency.get(data);

                    if (status) {return status['code']} else return '';
                } else return '';
            },
        },
        {
            headerName: '单价',
            field: 'price',
            width: 90,
        },
        {
            headerName: '总金额',
            field: 'total',
            width: 90,
        }
    ];
    public selectedColumnProcurementDefs = [
        {
            headerName: '采购合同',
            field: 'procurement.procurement_contact_no',
            width: 120,
        },
        {
            headerName: '供应商',
            field: 'procurement.company.full_name',
            width: 90,
        },
        {
            headerName: '采购时间',
            field: 'procurement.date_added',
            width: 120,
        },
        {
            headerName: '采购员',
            field: 'procurement.user.name',
            width: 80,
        },
        {
            headerName: '采购型号',
            field: 'factory_no',
            width: 90,
        },
        {
            headerName: '数量',
            field: 'quantity',
            width: 90,
        },
        {
            headerName: '货币',
            field: 'procurement.currency_id',
            width: 90,
            cellRenderer: (params) => {
                let data = params.value;
                if (data) {
                    let status = this.currency.get(data);

                    if (status) {return status['code']} else return '';
                } else return '';
            },
        },
        {
            headerName: '单价',
            field: 'price',
            width: 90,
        }
    ];

    pageClick($event) {
        this.createRowData($event.text - 0, this.searchtext);
        this.selectedrowData = null;
    }

    search($event) {
        this.createRowData(1, $event);
        this.searchtext = $event;
        this.selectedrowData = null;
    }

    constructor(private router: Router,
        private listservice: ProductListService,
        private currency: CurrencyService,
        private appconfig: AppconfigService, ) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions> {};
        this.createRowData(1);
        //按钮组配置
        this.actionConfig = new CommonActionBarConfig();
        this.actionConfig.openUrl = 'pages/products/product/detail';
        this.actionConfig.idName = 'product_id';
    }

    //行配置项(获取数据)
    private createRowData(page, key?: string) {
        this.listservice.getTurnoverList(page)
            .subscribe(data => {
                this.rowData = data;
            })
    }

    //选中行列表行配置
    private onRowSelected($event) {
        if ($event.node.selected) {
            this.selectedrowData = $event.node.data;
            //产品清单数据
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
        this.router.navigate(['pages/products/product/detail', $event.data.product_id])
    }

    //选中订单数据改变
    objectChange() {
        this.selectedrowData = null;
        this.createRowData(this.paginate.current_page);
    }
}
