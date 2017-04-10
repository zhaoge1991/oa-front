import {Component, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {OrderService} from "../../../../../../services/order/order.service"

@Component({
    selector: 'bar-common-action-bar-procurement-generate-freeze-order',
    templateUrl: './generateFreezeOrder.html',
    providers: [OrderService]
})

export class GenerateFreezeOrderActionBarComponent {
    @Input() config: any;
    @Input() object: any;
    @Input() objects: any;
    @Output() objectChange = new EventEmitter();
    @Output() onComplete = new EventEmitter();
    @ViewChild('dialog') dialog: ModalDirective;
    constructor(
        private router: Router,
        private listservice: OrderService,
    ) {

    }
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
            headerName: '中文描述',
            field: 'zh_name',
            width: 360,
            pinned: true //固定列
        },
        {
            headerName: '待处理数',
            field: 'wait_process_quantity',
            width: 120,
            pinned: true //固定列
        },
        {
            headerName: '可用库存',
            field: 'enable_quantity',
            width: 120,
        },
        {
            headerName: '冻结数',
            field: 'input_freeze_quantity',
            width: 120,
            editable: true
        },

    ];

    showDialog() {
        this.dialog.show();
    }

    onSubmit() {
        this.listservice.toFreezeOrder(this.objects).subscribe(data => {
            if(data.status=='success'){
                this.dialog.hide();
                this.onComplete.emit(true);
            }
        })
    }

}
