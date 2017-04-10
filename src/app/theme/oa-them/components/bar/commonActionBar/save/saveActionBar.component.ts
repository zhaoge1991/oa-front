import {Component, Input,EventEmitter,Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
    selector: 'bar-common-action-bar-save',
    template: `
    <div class="btnitem">
    <button type="button" *ngIf="config.saveUrl" class="available" (click)="save()" [disabled]="!object">
      <i class="iconfont icon-baocun"></i><span>保存</span>
    </button>
  </div>
  `
})

export class SaveActionBarComponent {
    @Input() config:any;
    @Input() object:any
    @Output() objectSave = new EventEmitter();
    constructor() {}
    save() {
        this.object=null;
        this.objectSave.emit(true)
    }

}
