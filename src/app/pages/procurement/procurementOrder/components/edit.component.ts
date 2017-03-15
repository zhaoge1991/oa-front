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
@Component({
    selector: 'procurement-procurement-order-edit',
    templateUrl: './edit.html',
})

export class EditComponent implements OnInit {
    
    @ViewChild(SupplierSelectComponent) selectSupplier: SupplierSelectComponent;
    @ViewChild(ProductSelectComponent) selectproduct: ProductSelectComponent;
    @ViewChild(CostComponent) addcostdialog: CostComponent;
    private progridOptions: GridOptions;
    private costgridOptions: GridOptions;
    private id: number;
    private procurementOrder: ProcurementOrder;
    private isEdit: boolean;

    //按钮组配置
    private actionConfig: {} = {
        showbtn: {save: true, annex: true, delete: true, close: true},
        openurl: 'pages/sale/order-manager/detail',
        addurl: 'pages/sale/order-manager/edit',
        idname: 'order_id'
    };
    //选中行列表行配置
    private customerData;
    private ordercostData: any[];
    private ordercostAll: number = 0;
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
    private orderpaymentData;
    private orderscheduleData;
    private currency_id: number;
    private customer;
    //商品列定义
    private selectedcolumnDefs = [
        {
            headerName: '产品id',
            field: 'product_id',
            width: 90
        },
        {
            headerName: '产品型号',
            field: 'model',
            width: 160,
            editable: true
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
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderservice: ProcurementOrderService,
        private payment: PaymentService,
        private appconfig: AppconfigService,
        private quantifier: QuantifierService
    ) {
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
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDetail(this.id).subscribe(data => {
                this.procurementOrder = data;
            })
        } else {
            this.procurementOrder = new ProcurementOrder();
        }
    }


    //选中产品
    private isproselected: boolean = false;
    onRowSelected($event) {
        this.isproselected = true
    }

    //添加产品按钮
    addpbtn() {
        this.selectproduct.show();
    }
    addproduct($event) {
        this.procurementOrder.addProduct($event);
        this.progridOptions.api.addItems([$event]);
    }

    //删除产品
    deletepro() {
        let selectedNodes = this.progridOptions.api.getSelectedNodes();
        this.progridOptions.api.removeItems(selectedNodes);
        this.procurementOrder.deleteProduct(selectedNodes[0].childIndex);
        this.isproselected = false;
    }

    //选中费用
    private iscostselected: boolean = false;
    oncostRowSelected($event) {
        this.iscostselected = true;
    }
    addcostbtn() {
        this.addcostdialog.showdialog();
    }
    addcost($event) {
        this.procurementOrder.addCost($event);
        this.costgridOptions.api.addItems([$event]);
    }

    //删除费用
    deletecost() {
        let selectedNodes = this.costgridOptions.api.getSelectedNodes();
        this.costgridOptions.api.removeItems(selectedNodes);
        this.procurementOrder.deleteCost(selectedNodes[0].childIndex);
        this.iscostselected = false;
    }

    //保存
    save() {

        if (this.id) {
            this.orderservice.add(this.procurementOrder).subscribe(data => {
                console.log(data);
            });
        } else {
            this.orderservice.edit(this.id, this.procurementOrder).subscribe(data => {
                console.log(data);
            });
        }

    }

}

