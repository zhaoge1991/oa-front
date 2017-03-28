import {Component, Input} from '@angular/core';

@Component({
  selector: 'bar-common-action-bar-paymentTip',
  template: `
    <div class="btnitem" *ngIf="config.paymentTip">
    <button type="button" class="available" (click)="paymentTip()" [disabled]="!object">
      <i class="iconfont icon-xiazai-copy"></i><span>提醒查款</span>
    </button>
  </div>
  `
})

export class PaymentTipActionBarComponent {
  @Input() config:any;
  @Input() object:any

  paymentTip() {
    alert('paymentTip:' + this.object.order_id );
  }

}
