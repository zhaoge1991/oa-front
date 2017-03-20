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
            width: 480,
            editable: true,
            colDef: " "
        },
        {
            headerName: '中文描述',
            field: 'zh_name',
            width: 480,
            editable: true
        },
        {
            headerName: '英文描述',
            field: 'en_name',
            width: 480,
            editable: true
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
            editable: true
        },
        {
            headerName: '数量',
            field: 'quantity',
            width: 60,
            editable: true
        },
        {
            headerName: '实际销售单价',
            field: 'price',
            width: 90,
            editable: true
        },
        {
            headerName: '实际销售金额',
            field: 'total',
            width: 90,
            editable: true
        },
        {
            headerName: '指导价',
            field: 'reference_price',
            width: 90,
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
            this.orderservice.getDetail(this.id).subscribe(data => {
                this.procurementOrder = new ProcurementOrder(data);
            })
        } else {
            this.procurementOrder = new ProcurementOrder(null);
        }
    }

    //保存
    onProcurementOrderSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.edit(this.id, this.procurementOrder).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/procurement_order'])
                    }
                });
            } else {
                this.orderservice.add(this.procurementOrder).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/procurement_order'])
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

    //添加产品按钮
    addpbtn() {
        this.selectProductComponent.show();
    }
    addproduct($event) {
        let procurementOrderProduct = new ProcurementOrderProduct($event);
        this.procurementOrder.addProduct(procurementOrderProduct);
        this.progridOptions.api.addItems([procurementOrderProduct]);
    }

    //删除产品
    deletepro() {
        let selectedNodes = this.progridOptions.api.getSelectedNodes();
        this.progridOptions.api.removeItems(selectedNodes);
        this.procurementOrder.deleteProduct(selectedNodes[0].childIndex);
        this.selectedProduct = null;
    }


    //选中费用
    onSelectedCostRow($event) {
        if (this.costgridOptions.api.getSelectedRows().length >= 1) {
            this.selectedCost = this.costgridOptions.api.getSelectedRows()[0] as ProcurementOrderCost;
        }
    }
    addcostbtn() {
        this.addcostdialog.showdialog();
    }
    addcost($event) {
        this.procurementOrder.addCost($event as ProcurementOrderCost);
        this.costgridOptions.api.addItems([$event]);
    }

    //删除费用
    deletecost() {
        let selectedNodes = this.costgridOptions.api.getSelectedNodes();
        this.costgridOptions.api.removeItems(selectedNodes);
        this.procurementOrder.deleteCost(selectedNodes[0].childIndex);
        this.selectedCost = null;
    }


    get diagnostic() {return JSON.stringify(this.procurementOrder);}


}

