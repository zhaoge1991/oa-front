import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
    selector: 'bar-common-action-bar-new',
    template: `
    <div class="btnitem">
    <button type="button"  *ngIf="config.addNewUrl" class="available" (click)="addNew()">
      <i class="iconfont icon-dakai"></i><span>新建</span>
    </button>
  </div>
  `,
    styleUrls: ['./new.scss']
})

export class NewActionBarComponent {
    @Input() config:any;
    constructor(private router: Router) {}
    addNew() {
        this.router.navigate([this.config.addNewUrl]);
    }

}
