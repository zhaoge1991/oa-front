import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {ProcurementSupplier} from "../../../../models/procurement/procurementSupplier";
import {ProcurementSupplierService} from "../../../../services/procurement/procurementSupplier.service";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {SupplierProduct} from "../../../../models/procurement/supplier/supplierProduct"
import {SupplierContact} from "../../../../models/procurement/supplier/supplierContact"
import {Bank} from "../../../../models/common/finance/bank"

@Component({
    selector: 'procurement-supplier-edit',
    templateUrl: './edit.html',
})

export class EditComponent implements OnInit {

    @ViewChild(CostComponent) addcostdialog: CostComponent;
    private productGridOptions: GridOptions;
    private bankGridOptions: GridOptions;
    private contactGridOptions: GridOptions;
    private id: number;
    private procurementSupplier: ProcurementSupplier;
    private isEdit: boolean;
    private selectedProduct: SupplierProduct;
    private selectedBank: Bank;
    private selectedContact: SupplierContact;

    private commonActionBarConfig: CommonActionBarConfig;

    //商品列定义
    private productColumnDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {
            headerName: '商品分类',
            field: 'product_category',
            width: 90,
            editable: true,
        },
        {
            headerName: '备注',
            field: 'remark',
            width: 200,
            editable: true,
        },

    ];

    private bankColumnDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {headerName: '账户', field: 'bank_no', width: 120,editable: true,},
        {headerName: '开户银行全称', field: 'bank_name', width: 150,editable: true},
        {headerName: '收款人', field: 'payee', width: 80,editable: true},
        {headerName: '账户类别', field: 'type', width: 100,editable: true},
        {headerName: '备注', field: 'remark', width: 240,editable: true}
    ];
    private ContactColumnDefs = [
        {
            headerName: "#", width: 30, suppressSorting: true,
            suppressMenu: true, pinned: true,
            cellRenderer: function (params) {
                return params.rowIndex + 1
            }
        },
        {headerName: '联系人', field: 'name', width: 80,editable: true,},
        {headerName: '职位', field: 'position', width: 80,editable: true},
        {headerName: '称谓', field: 'appellation', width: 80,editable: true},
        {headerName: '性别', field: 'sex', width: 40,editable: true},
        {headerName: '所属部门', field: 'department', width: 80,editable: true},
        {headerName: '公司电话', field: 'phone', width: 120,editable: true},
        {headerName: '个人手机', field: 'mobile', width: 120,editable: true},
        {headerName: '传真', field: 'fax', width: 120,editable: true},
        {headerName: 'QQ', field: 'QQ', width: 120,editable: true},
    ];
    

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderservice: ProcurementSupplierService,
    ) {

        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.saveUrl = 'pages/procurement/supplier/edit';
        this.commonActionBarConfig.idName = 'procurement_supplier_id';

        this.productGridOptions = <GridOptions> {
            context: {
                componentParent: this
            }
        };
        this.bankGridOptions = <GridOptions> {
            context: {
                componentParent: this
            }
        };
        this.contactGridOptions = <GridOptions> {
            context: {
                componentParent: this
            }
        };
        this.procurementSupplier = new ProcurementSupplier(null);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDetail(this.id).subscribe(data => {
                this.procurementSupplier = new ProcurementSupplier(data);
            })
        } else {
            this.procurementSupplier = new ProcurementSupplier(null);
        }
    }

    //保存
    onSupplierSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.edit(this.id, this.procurementSupplier).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/supplier'])
                    }
                });
            } else {
                this.orderservice.add(this.procurementSupplier).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/supplier'])
                    }
                });

            }
        }
    }


    onSelectedProduct($event) {
        if (this.productGridOptions.api.getSelectedRows().length >= 1) {
            this.selectedProduct = this.productGridOptions.api.getSelectedRows()[0] as SupplierProduct;
        }
    }

    addProduct($event) {
        let supplierProduct = new SupplierProduct(null)
        this.procurementSupplier.addProduct(supplierProduct);
        this.productGridOptions.api.addItems([supplierProduct]);
    }

    //删除产品
    deleteProduct() {
        let selectedNodes = this.productGridOptions.api.getSelectedNodes();
        this.productGridOptions.api.removeItems(selectedNodes);
        for (let selectedNode of selectedNodes) {
            this.procurementSupplier.deleteProduct(selectedNode.childIndex);
        }
        this.selectedProduct = null;
    }


    //选中银行
    onSelectedBank($event) {
        if (this.bankGridOptions.api.getSelectedRows().length >= 1) {
            this.selectedBank = this.bankGridOptions.api.getSelectedRows()[0] as Bank;
        }
    }
    addBank($event) {
        let bank = new Bank(null)
        this.procurementSupplier.addBank(bank);
        this.bankGridOptions.api.addItems([bank]);
    }

    deleteBank() {
        let selectedNodes = this.bankGridOptions.api.getSelectedNodes();
        this.bankGridOptions.api.removeItems(selectedNodes);

        for (let selectedNode of selectedNodes) {
            this.procurementSupplier.deleteBank(selectedNode.childIndex);
        }
        this.selectedBank = null;
    }
    //选中联系人
    onSelectedContact($event) {
        if (this.contactGridOptions.api.getSelectedRows().length >= 1) {
            this.selectedContact = this.contactGridOptions.api.getSelectedRows()[0] as SupplierContact;
        }
    }
    addContact($event) {
        let contact = new SupplierContact(null)
        this.procurementSupplier.addContact(contact);
        this.contactGridOptions.api.addItems([contact]);
    }

    deleteContact() {
        let selectedNodes = this.contactGridOptions.api.getSelectedNodes();
        this.contactGridOptions.api.removeItems(selectedNodes);

        for (let selectedNode of selectedNodes) {
            this.procurementSupplier.deleteContact(selectedNode.childIndex);
        }
        this.selectedContact = null;
    }
    get diagnostic() {return JSON.stringify(this.procurementSupplier);}


}

