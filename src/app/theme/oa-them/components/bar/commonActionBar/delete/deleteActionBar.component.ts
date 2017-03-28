import {Component, Input,EventEmitter,Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {HttpInterceptorService} from '../../../../../../services/interceptor'
import {AlertService} from "../../../../../../services/core/alert.component.service";
@Component({
    selector: 'bar-common-action-bar-delete',
    template: `
    <div class="btnitem"  *ngIf="config.deleteUrl">
    <button type="button" class="available" (click)="delete()" [disabled]="!object">
      <i class="iconfont icon-shanchu"></i><span>删除</span>
    </button>
  </div>
  `
})

export class DeleteActionBarComponent {
    @Input() config:any;
    @Input() object:any
    @Output() objectDelete = new EventEmitter();
    constructor(private router: Router,private http:HttpInterceptorService,private alertservice: AlertService) {}
    delete() {
      let sub = this.alertservice.putMessage({
        title: '询问弹窗',
        detail: '确定要删除订单吗？',
        severity: 'info'
      }).subscribe(data=>{
        this.objectDelete.emit(data)
        sub.unsubscribe();
      });

    }

}
