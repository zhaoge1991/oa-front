import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {WarehouseEnterService} from "../../../../services/depot/warehouseEnter.service";
import {WarehouseEnter} from "../../../../models/depot/warehouseEnter"
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig"
import {Location} from '@angular/common';
@Component({
    selector: 'depot-warehouse-enter-show',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailComponent implements OnInit {


    private warehouseEnter: WarehouseEnter;
    private sub: any;
    private commonActionBarConfig: CommonActionBarConfig;

    constructor(
        private route: ActivatedRoute,
        private listservice: WarehouseEnterService,
        private location: Location
    ) {
        this.commonActionBarConfig = new CommonActionBarConfig();
        this.commonActionBarConfig.addNewUrl = 'pages/depot/enter_order/edit';
        this.commonActionBarConfig.deleteUrl = 'pages/depot/enter_order';
        this.commonActionBarConfig.idName = 'warehouse_enter_id';
        this.commonActionBarConfig.editUrl = 'pages/depot/enter_order/edit';

    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.listservice.getDetail(params['id']).subscribe(data => {
                this.warehouseEnter = data;
            })
        })
    }
    
    objectDelete(b: boolean) {
        this.listservice.delete(this.warehouseEnter).subscribe(data => {
            this.location.back();
        });
    }
    

}
