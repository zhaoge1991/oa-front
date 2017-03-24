import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
@Component({
    selector: 'bar-common-action-bar-back',
    template: `
    <div class="btnitem" *ngIf="!config.noback">
    <button type="button" class="available" (click)="back()">
      <i class="iconfont icon-guanbishanchu"></i><span>返回</span>
    </button>
  </div>
  `
})

export class BackActionBarComponent {
    @Input() config: any;
    @Input() object: any
    constructor(private location: Location) {}
    back() {
        this.location.back();
    }

}
