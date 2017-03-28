import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {FreezeOrderService} from "../../../../services/procurement/freezeOrder.service";
import {FreezeOrder} from "../../../../models/procurement/freezeOrder"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {Location} from '@angular/common';
@Component({
    selector: 'procurement-procurement-order-show',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailComponent implements OnInit {


    public freezeOrder: FreezeOrder;
    private sub: any;
    private product_total_quantity = 0;
    private commonActionBarConfig: CommonActionBarConfig;

    constructor(
        private route: ActivatedRoute,
        private orderservice: FreezeOrderService,
        private listservice: FreezeOrderService,
        private location: Location
    ) {
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.deleteUrl = 'pages/procurement/freeze_order';
        this.commonActionBarConfig.idName = 'procurement_freeze_id';
        this.commonActionBarConfig.editUrl = 'pages/procurement/freeze_order/edit';

    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.orderservice.getDetail(params['id']).subscribe(data => {
                this.freezeOrder = data;
                for (let product of data.products) {
                    this.product_total_quantity += product.quantity;
                }
            })
        })
    }
    
    objectDelete(b: boolean) {
        this.listservice.delete(this.freezeOrder).subscribe(data => {
            this.location.back();
        });
    }
    

}
