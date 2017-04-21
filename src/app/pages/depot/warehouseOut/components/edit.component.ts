import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {WarehouseOut} from "../../../../models/depot/warehouseOut";
import {WarehouseOutService} from "../../../../services/depot/warehouseOut.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {SupplierSelectComponent} from "../../../../theme/oa-them/components/supplierSelectComponent/supplierSelect.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {WarehouseOutProduct} from "../../../../models/depot/warehouseOutProduct"
import {WarehouseOutCost} from "../../../../models/depot/warehouseOutCost"

import {AgGridCurrencyComponent} from "../../../../modules/agGrid/common/agGridCurrency.component"
import {AgGridMultiLineComponent} from "../../../../modules/agGrid/common/agGridMultiLine.component"
@Component({
    selector: 'depot-warehouse-out-edit',
    templateUrl: './edit.html',
})

export class EditComponent implements OnInit {

    @ViewChild(SupplierSelectComponent) selectSupplier: SupplierSelectComponent;
    @ViewChild(ProductSelectComponent) selectProductComponent: ProductSelectComponent;
    @ViewChild(CostComponent) addcostdialog: CostComponent;
    private progridOptions: GridOptions;
    private costgridOptions: GridOptions;
    private id: number;
    private warehouseOut: WarehouseOut;
    private isEdit: boolean;
    private selectedProduct: WarehouseOutProduct;
    private otherCost:number;//其他费用
    
    //商品列定义
    private selectedcolumnDefs = [
        {
            headerName: '产品id',
            field: 'product_id',
            width: 90
        },
        {
            headerName: '中文描述',
            field: 'zh_name',
            width: 480,
            cellEditorFramework: AgGridMultiLineComponent,
            editable: true,
        },
        {
            headerName: '英文描述',
            field: 'en_name',
            width: 480,
            cellEditorFramework: AgGridMultiLineComponent,
            editable: true,
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
            
            editable: true
        },
        {
            headerName: '数量',
            field: 'quantity',
            width: 60,
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
        private orderservice: WarehouseOutService,
        private payment: PaymentService,
        private appconfig: AppconfigService,
        private quantifier: QuantifierService
    ) {

        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.saveUrl = 'pages/depot/depot_order/edit';
        this.commonActionBarConfig.idName = 'depot_order_id';

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
        this.warehouseOut = new WarehouseOut(null);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDetail(this.id).subscribe(data => {
                this.warehouseOut = new WarehouseOut(data);
            })
        } else {
            this.warehouseOut = new WarehouseOut(null);
        }
    }

    //保存
    onWarehouseOutSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.edit(this.id, this.warehouseOut).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/depot/out_order'])
                    }
                });
            } else {
                this.orderservice.add(this.warehouseOut).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/depot/out_order'])
                    }
                });

            }
        }
    }
    
    onSelectedProduct($event) {
        if (this.progridOptions.api.getSelectedRows().length >= 1) {
            this.selectedProduct = this.progridOptions.api.getSelectedRows()[0] as WarehouseOutProduct;
        }
    }

    //添加产品按钮
    addpbtn() {
        this.selectProductComponent.show();
    }
    addproduct($event) {
        let warehouseOutProduct = new WarehouseOutProduct($event);
        this.warehouseOut.addProduct(warehouseOutProduct);
        this.progridOptions.api.addItems([warehouseOutProduct]);
    }

    //删除产品
    deletepro() {
        let selectedNodes = this.progridOptions.api.getSelectedNodes();
        this.progridOptions.api.removeItems(selectedNodes);
        for (let selectedNode of selectedNodes){
            this.warehouseOut.deleteProduct(selectedNode);
        }
        
        this.selectedProduct = null;
    }

    get diagnostic() {return JSON.stringify(this.warehouseOut);}


}

