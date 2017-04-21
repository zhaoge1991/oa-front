import {Component, Input,EventEmitter,Output,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'bar-common-action-bar-depot-generate-enter-order',
  template: `
  <div class="btnitem" *ngIf="config.generateEnterOrderUrl">
  <button type="button" class="available" id="action-more" data-toggle="dropdown" aria-expanded="false"
          [disabled]="!object">
    <i class="iconfont icon-caozuo"></i><span>操作 <i class="iconfont icon-jiantou"></i></span>
  </button>
  <div class="btnmore" aria-labelledby="action-more">
    <ul>
      <li>
        <button class="available" (click)="outEnterOrder()">生成入库单</button>
      </li>
    </ul>
  </div>
</div>

  
  `
})

export class GenerateEnterOrderActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();

  constructor(private router:Router) {
  }

  outEnterOrder() {
    this.router.navigate([this.config.generateEnterOrderUrl, this.object[this.config.idName]]);
  }
}
