import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {WarehouseEnter} from "../../../../models/depot/warehouseEnter";
import {WarehouseEnterService} from "../../../../services/depot/warehouseEnter.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {SupplierSelectComponent} from "../../../../theme/oa-them/components/supplierSelectComponent/supplierSelect.component";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {ProductSelectComponent} from "../../../../theme/oa-them/components/productselectComponent/product_select.component";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {WarehouseEnterProduct} from "../../../../models/depot/warehouseEnterProduct"
import {WarehouseEnterCost} from "../../../../models/depot/warehouseEnterCost"

import {AgGridCurrencyComponent} from "../../../../modules/agGrid/common/agGridCurrency.component"
import {AgGridMultiLineComponent} from "../../../../modules/agGrid/common/agGridMultiLine.component"
@Component({
    selector: 'depot-warehouse-enter-edit',
    templateUrl: './edit.html',
})

export class EditComponent implements OnInit {

    @ViewChild(SupplierSelectComponent) selectSupplier: SupplierSelectComponent;
    @ViewChild(ProductSelectComponent) selectProductComponent: ProductSelectComponent;
    @ViewChild(CostComponent) addcostdialog: CostComponent;
    private progridOptions: GridOptions;
    private costgridOptions: GridOptions;
    private id: number;
    private warehouseEnter: WarehouseEnter;
    private isEdit: boolean;
    private selectedProduct: WarehouseEnterProduct;
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
        private orderservice: WarehouseEnterService,
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
        this.warehouseEnter = new WarehouseEnter(null);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDetail(this.id).subscribe(data => {
                this.warehouseEnter = new WarehouseEnter(data);
            })
        } else {
            this.warehouseEnter = new WarehouseEnter(null);
        }
    }

    //保存
    onWarehouseEnterSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.edit(this.id, this.warehouseEnter).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/depot/enter_order'])
                    }
                });
            } else {
                this.orderservice.add(this.warehouseEnter).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/depot/enter_order'])
                    }
                });

            }
        }
    }
    onDemanderChange(id: number) {
        console.log('采购单组件需求方改变事件：' + id);
        this.warehouseEnter.warehouse_enter_id = id;
    }


    onSupplierChange(id: number) {
        console.log('采购单组件供应商改变事件：' + id);
        this.warehouseEnter.warehouse_enter_id = id;
    }
    onSelectedProduct($event) {
        if (this.progridOptions.api.getSelectedRows().length >= 1) {
            this.selectedProduct = this.progridOptions.api.getSelectedRows()[0] as WarehouseEnterProduct;
        }
    }

    //添加产品按钮
    addpbtn() {
        this.selectProductComponent.show();
    }
    addproduct($event) {
        let warehouseEnterProduct = new WarehouseEnterProduct($event);
        this.warehouseEnter.addProduct(warehouseEnterProduct);
        this.progridOptions.api.addItems([warehouseEnterProduct]);
    }

    //删除产品
    deletepro() {
        let selectedNodes = this.progridOptions.api.getSelectedNodes();
        this.progridOptions.api.removeItems(selectedNodes);
        for (let selectedNode of selectedNodes){
            this.warehouseEnter.deleteProduct(selectedNode);
        }
        
        this.selectedProduct = null;
    }

    get diagnostic() {return JSON.stringify(this.warehouseEnter);}


}

