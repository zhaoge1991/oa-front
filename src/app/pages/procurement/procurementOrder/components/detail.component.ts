import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppconfigService} from "../../../../services/core/appConfigService/appConfigService";
import {ProcurementOrderService} from "../../../../services/procurement/procurementOrder.service";

@Component({
    selector: 'procurement-procurement-order-show',
    templateUrl: './detail.html',
    styleUrls: ['./detail.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderservice: ProcurementOrderService,
        private appconfig: AppconfigService
    ) {}

    private id: number;
    private data: any;
    private sub: any;
    private isdone: boolean;
    private ordertype: number;
    private product_total_quantity=0;
    
    
    //按钮组配置
    private actionConfig = {
        showbtn: {add: true, edit: true, action: true, export: true, annex: true, delete: true, close: true},
        openurl: 'pages/procurement/procurement_order/detail',
        addurl: 'pages/procurement/procurement_order/edit',
        idname: 'procurement_order_id'
    };
    //操作组配置
    private operat: {
        toship?: boolean,
        orderdemand?: boolean,
        supaudit?: boolean,
        financeaudit?: boolean,
        procurement?: boolean,
        toshipment?: boolean,
        cusrecive?: boolean,
        procurementcheck?: boolean,
        isdone?: boolean
    } = {};
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.orderservice.getDetail(params['id']).subscribe(data => {
                this.data = data;
                this.operat = {toship: true,orderdemand: true};
                for (let product of data.procurement_order_product) {
                    this.product_total_quantity +=product.quantity;
                }
                
                
            })
        })
    }
    ngOnDestroy() {this.sub.unsubscribe();}

}
