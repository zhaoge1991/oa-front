import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
    selector: 'bar-common-action-bar-open',
    template: `
    <div class="btnitem">
    <button type="button" *ngIf="config.openUrl" class="available" (click)="open()" [disabled]="!object">
      <i class="iconfont icon-dakai"></i><span>打开</span>
    </button>
  </div>
  `,
    styleUrls: ['./open.scss']
})

export class OpenActionBarComponent {
    @Input() config:any;
    @Input() object:any
    constructor(private router: Router) {}
    open() {
      if(this.object[this.config.idName]){
        this.router.navigate([this.config.openUrl,this.object[this.config.idName]]);
      } else {
        this.router.navigate([this.config.openUrl]);
      }
    }

}
