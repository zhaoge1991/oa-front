import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GridOptions} from "ag-grid/main";

import {ProcurementDemander} from "../../../../models/procurement/procurementDemander";
import {ProcurementDemanderService} from "../../../../services/procurement/procurementDemander.service";
import {CostComponent} from "../../../../theme/oa-them/components/costComponent/cost.component";
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {Bank} from "../../../../models/common/finance/bank"

@Component({
    selector: 'procurement-demander-edit',
    templateUrl: './edit.html',
})

export class EditComponent implements OnInit {

    @ViewChild(CostComponent) addcostdialog: CostComponent;
    private productGridOptions: GridOptions;
    private bankGridOptions: GridOptions;
    private contactGridOptions: GridOptions;
    private id: number;
    private procurementDemander: ProcurementDemander;
    private isEdit: boolean;
    private selectedBank: Bank;

    private commonActionBarConfig: CommonActionBarConfig;

    
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
        private orderservice: ProcurementDemanderService,
    ) {

        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.saveUrl = 'pages/procurement/demander/edit';
        this.commonActionBarConfig.idName = 'procurement_demander_id';

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
        this.procurementDemander = new ProcurementDemander(null);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.isEdit = !!this.id;
        });
        if (this.id) {
            this.orderservice.getDetail(this.id).subscribe(data => {
                this.procurementDemander = new ProcurementDemander(data);
                
            })
        } else {
            this.procurementDemander = new ProcurementDemander(null);
        }
    }

    //保存
    onDemanderSave(event: boolean) {
        if (event) {
            if (this.id) {
                this.orderservice.edit(this.id, this.procurementDemander).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/demander'])
                    }
                });
            } else {
                this.orderservice.add(this.procurementDemander).subscribe(data => {
                    if (data.status == 'success') {
                        this.router.navigate(['pages/procurement/demander'])
                    }
                });

            }
        }
    }

    //选中银行
    onSelectedBank($event) {
        if (this.bankGridOptions.api.getSelectedRows().length >= 1) {
            this.selectedBank = this.bankGridOptions.api.getSelectedRows()[0] as Bank;
        }
    }
    addBank($event) {
        let bank = new Bank(null)
        this.procurementDemander.addBank(bank);
        this.bankGridOptions.api.addItems([bank]);
    }

    deleteBank() {
        let selectedNodes = this.bankGridOptions.api.getSelectedNodes();
        this.bankGridOptions.api.removeItems(selectedNodes);

        for (let selectedNode of selectedNodes) {
            this.procurementDemander.deleteBank(selectedNode.childIndex);
        }
        this.selectedBank = null;
    }
    //选中联系人
    
    get diagnostic() {return JSON.stringify(this.procurementDemander);}


}

