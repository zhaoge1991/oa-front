import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
    selector: 'bar-common-action-bar-forward',
    template: `
    <div class="btnitem" *ngIf="config.forwardUrl">
    <button type="button" class="available" (click)="forward()" [disabled]="!object">
      <i class="iconfont icon-bianji"></i><span>转发</span>
    </button>
  </div>
  `
})

export class ForwardActionBarComponent {
    @Input() config:any;
    @Input() object:any
    constructor(private router: Router) {}
    forward() {
      if(this.object[this.config.idName]){
        this.router.navigate([this.config.forwardUrl,this.object[this.config.idName]]);
      } else {
        this.router.navigate([this.config.forwardUrl]);
      }

    }

}
