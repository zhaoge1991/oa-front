import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {ProcurementOrderService} from "../../../../services/procurement/procurementOrder.service";
import {ProcurementOrder} from "../../../../models/procurement/procurementOrder"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {Location} from '@angular/common';
@Component({
    selector: 'procurement-procurement-order-show',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailComponent implements OnInit {


    private procurementOrder: ProcurementOrder;
    private sub: any;
    private product_total_quantity = 0;
    private commonActionBarConfig: CommonActionBarConfig;

    constructor(
        private route: ActivatedRoute,
        private orderservice: ProcurementOrderService,
        private listservice: ProcurementOrderService,
        private location: Location
    ) {
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.idName = 'procurement_order_id';
        this.commonActionBarConfig.generateEnterOrderUrl = 'pages/depot/procurement_order/edit';
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.orderservice.getDetail(params['id']).subscribe(data => {
                this.procurementOrder = data;
                for (let product of data.procurement_order_product) {
                    this.product_total_quantity += product.quantity;
                }
            })
        })
    }
    
    objectDelete(b: boolean) {
        this.listservice.delete(this.procurementOrder).subscribe(data => {
            this.location.back();
        });
    }
    

}
