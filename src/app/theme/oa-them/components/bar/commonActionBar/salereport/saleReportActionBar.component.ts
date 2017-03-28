import {Component, Input,EventEmitter,Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'bar-common-action-bar-saleReport',
  template: `
  <div class="btnitem" *ngIf="config.saleReport" >
    <button type="button"  class="available" (click)="report()" [disabled]="!object">
      <i class="iconfont icon-baobiao"></i><span>销售报表</span>
    </button>
  </div>
  `
})

export class SaleReportActionBarComponent {
  @Input() config:any;
  @Input() object:any
  constructor() {}
  report() {
    alert('report:' + this.object.order_id)
  }

}
