import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
    selector: 'bar-common-action-bar-new',
    template: `
    <div class="btnitem">
    <button type="button"  class="available" (click)="addNew()">
      <i class="iconfont icon-dakai"></i><span>新建</span>
    </button>
  </div>
  `,
    styleUrls: ['./new.scss']
})

export class NewActionBarComponent {
    @Input() url = '/';
    constructor(private router: Router) {}
    addNew() {
        this.router.navigate([this.url]);
    }

}
