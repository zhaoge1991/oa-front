import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
    selector: 'bar-common-action-bar-edit',
    template: `
    <div class="btnitem">
    <button type="button" *ngIf="config.editUrl" class="available" (click)="edit()" [disabled]="!object">
      <i class="iconfont icon-bianji"></i><span>编辑</span>
    </button>
  </div>
  `,
    styleUrls: ['./edit.scss']
})

export class EditActionBarComponent {
    @Input() config:any;
    @Input() object:any
    constructor(private router: Router) {}
    edit() {
      if(this.object[this.config.idName]){
        this.router.navigate([this.config.editUrl,this.object[this.config.idName]]);
      } else {
        this.router.navigate([this.config.editUrl]);
      }

    }

}
