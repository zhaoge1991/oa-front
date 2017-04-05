import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {WarehouseOutService} from "../../../../services/depot/warehouseOut.service";
import {WarehouseOut} from "../../../../models/depot/warehouseOut"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {Location} from '@angular/common';
@Component({
    selector: 'depot-warehouse-out-show',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailComponent implements OnInit {


    private warehouseOut: WarehouseOut;
    private sub: any;
    private commonActionBarConfig: CommonActionBarConfig;

    constructor(
        private route: ActivatedRoute,
        private listservice: WarehouseOutService,
        private location: Location
    ) {
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.addNewUrl = 'pages/depot/out_order/edit';
        this.commonActionBarConfig.deleteUrl = 'pages/depot/out_order';
        this.commonActionBarConfig.idName = 'warehouse_out_id';
        this.commonActionBarConfig.editUrl = 'pages/depot/out_order/edit';

    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.listservice.getDetail(params['id']).subscribe(data => {
                this.warehouseOut = data;
            })
        })
    }
    
    objectDelete(b: boolean) {
        this.listservice.delete(this.warehouseOut).subscribe(data => {
            this.location.back();
        });
    }
    

}
