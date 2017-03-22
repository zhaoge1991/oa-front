import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {FreezeOrder} from "../../../../models/procurement/freezeOrder";
import {FreezeOrderService} from "../../../../services/procurement/freezeOrder.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {SupplierSelectComponent} from "../../../../theme/oa-them/components/supplierSelectComponent/supplierSelect.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {FreezeOrderProduct} from "../../../../models/procurement/freezeOrderProduct"

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
    private freezeOrder: FreezeOrder;
    private isEdit: boolean;
    private selectedProduct: FreezeOrderProduct;
    private otherCost: number;//其他费用



    //商品列定义
    private selectedcolumnDefs = [
        {
            headerName: '产品id',
            field: 'product_id',
            width: 90
        },
        {
            headerName: '型号',
            field: 'product',
            cellRenderer: (params) => {
                return params.value.model;
            },
            width: 90,
            colDef: " "
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
            editable: true
        }
    ];

    private commonActionBarConfig: CommonActionBarConfig;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderservice: FreezeOrderService,
        private payment: PaymentService,
        private appconfig: AppconfigService,
        private quantifier: QuantifierService
    ) {

        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.saveUrl = 'pages/procurement/freeze/edit';
        this.commonActionBarConfig.idName = 'procurement_freeze_id';

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
        this.freezeOrder = new FreezeOrder(null);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDetail(this.id).subscribe(data => {
                console.log(data);
                this.freezeOrder = new FreezeOrder(data);
            })
        } else {
            this.freezeOrder = new FreezeOrder(null);
        }
    }

    //保存
    onFreezeOrderSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.edit(this.id, this.freezeOrder).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/freeze_order'])
                    }
                });
            } else {
                this.orderservice.add(this.freezeOrder).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/freeze_order'])
                    }
                });

            }
        }
    }

    get diagnostic() {return JSON.stringify(this.freezeOrder);}


}

