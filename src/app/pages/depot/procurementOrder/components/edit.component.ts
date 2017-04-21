import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {ProcurementOrder} from "../../../../models/procurement/procurementOrder";
import {ProcurementOrderService} from "../../../../services/procurement/procurementOrder.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {SupplierSelectComponent} from "../../../../theme/oa-them/components/supplierSelectComponent/supplierSelect.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {ProcurementOrderProduct} from "../../../../models/procurement/procurementOrderProduct"
import {ProcurementOrderCost} from "../../../../models/procurement/procurementOrderCost"

import {AgGridCurrencyComponent} from "../../../../modules/agGrid/common/agGridCurrency.component"
import {AgGridMultiLineComponent} from "../../../../modules/agGrid/common/agGridMultiLine.component"
@Component({
    selector: 'procurement-procurement-order-edit',
    templateUrl: './edit.html',
})

export class EditComponent implements OnInit {

    @ViewChild(SupplierSelectComponent) selectSupplier: SupplierSelectComponent;
    @ViewChild(ProductSelectComponent) selectProductComponent: ProductSelectComponent;
    @ViewChild(CostComponent) addcostdialog: CostComponent;
    private progridOptions: GridOptions;
    private costgridOptions: GridOptions;
    private id: number;
    private procurementOrder: ProcurementOrder;
    private isEdit: boolean;
    private selectedProduct: ProcurementOrderProduct;
    private selectedCost: ProcurementOrderCost;
    private otherCost:number;//其他费用
    
    
    
    //商品列定义
    private selectedcolumnDefs = [
        {
            headerName: '产品id',
            field: 'product_id',
            width: 90
        },
        {
            headerName: '工厂货号',
            field: 'factory_no',
            width: 90,
            colDef: " "
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
            cellEditorFramework: AgGridCurrencyComponent,
        },
        {
            headerName: '数量',
            field: 'quantity',
            width: 60,
        },
        {
            headerName: '已出库数量',
            field: 'enter_order_product_number',
            width: 120,
        }
        ,
        {
            headerName: '出库数量',
            field: 'quantityed',
            width: 120,
            editable: true
        }
    ];

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
    private commonActionBarConfig: CommonActionBarConfig;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderservice: ProcurementOrderService,
        private payment: PaymentService,
        private appconfig: AppconfigService,
        private quantifier: QuantifierService
    ) {

        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.saveUrl = 'pages/procurement/procurement_order/edit';
        this.commonActionBarConfig.idName = 'procurement_order_id';

        this.progridOptions = <GridOptions> {
            context: {
                componentParent: this
            }
        };
        this.costgridOptions = <GridOptions> {
            context: {
                componentParent: this
            }
        };
        this.procurementOrder = new ProcurementOrder(null);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDepotDetail(this.id).subscribe(data => {
                this.procurementOrder = new ProcurementOrder(data);
            })
        } else {
            this.procurementOrder = new ProcurementOrder(null);
        }
    }

    //保存
    onWarehouseEnterSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.generateEnterOrder(this.id, this.procurementOrder).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/depot/procurement_order'])
                    }
                });
            }
        }
    }
    onDemanderChange(id: number) {
        console.log('采购单组件需求方改变事件：' + id);
        this.procurementOrder.procurement_demander_id = id;
    }


    onSupplierChange(id: number) {
        console.log('采购单组件供应商改变事件：' + id);
        this.procurementOrder.procurement_supplier_id = id;
    }
    onSelectedProduct($event) {
        if (this.progridOptions.api.getSelectedRows().length >= 1) {
            this.selectedProduct = this.progridOptions.api.getSelectedRows()[0] as ProcurementOrderProduct;
        }
    }

    get diagnostic() {return JSON.stringify(this.procurementOrder);}


}

