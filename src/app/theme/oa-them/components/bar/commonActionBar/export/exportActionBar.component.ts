import {Component, Input,EventEmitter,Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'bar-common-action-bar-export',
  template: `
  <div class="btnitem" *ngIf="config.canEexport">
    <button type="button" class="available" id="export-more" data-toggle="dropdown" aria-expanded="false" [disabled]="!object">
      <i class="iconfont icon-daochu"></i><span>导出 <i class="iconfont icon-jiantou"></i></span>
    </button>
    <div class="btnmore" aria-labelledby="export-more">
      <ul>
        <li><button class="available" (click)="export('excel')">导出Excel</button></li>
        <li><button class="available" (click)="export('pdf')">导出PDF</button></li>
      </ul>
    </div>
  </div>
  `
})

export class ExportActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectExport = new EventEmitter();
  constructor() {}
  export(type:string) {
    this.objectExport.emit(type)
  }

}
