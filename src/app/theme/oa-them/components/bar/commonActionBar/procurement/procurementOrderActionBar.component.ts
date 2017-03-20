import {Component, Input,Output,EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import {ProcurementOrder} from '../../../../../../models/procurement/procurementOrder'
import {ProcurementOrderService} from "../../../../../../services/procurement/procurementOrder.service"

@Component({
    selector: 'bar-common-action-bar-procurement-order',
    template: `
    <div class="btnitem">
    <button type="button" *ngIf="config.isProcurementOrder"  class="available" data-toggle="dropdown" aria-expanded="false" [disabled]="!object">
      <i class="iconfont icon-caozuo"></i><span>操作 <i class="iconfont icon-jiantou"></i></span>
    </button>
    <div class="btnmore" aria-labelledby="action-more">
      <ul>
        <li *ngIf="object?.status==0"><button class="available" (click)="processing()">处理中</button></li>
        <li *ngIf="object?.status==2"><button class="available" (click)="complete()">已完成</button></li>
      </ul>
    </div>
  </div>

  `,
  providers: [ProcurementOrderService]
})

export class ProcurementOrderActionBarComponent {
    @Input() config: any;
    @Input() object: ProcurementOrder

    @Output() objectChange = new EventEmitter<ProcurementOrder>();

    constructor(private router: Router, private location:Location,private procurementOrderService: ProcurementOrderService) {}
    processing() {
        this.procurementOrderService.updateStatusProcessing(this.object).subscribe(data => {
            this.object.status = 1
            this.objectChange.emit(this.object);
        })
            ;
    }

}
