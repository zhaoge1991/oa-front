import {Component, Input,EventEmitter,Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {HttpInterceptorService} from '../../../../../../services/interceptor'
@Component({
    selector: 'bar-common-action-bar-delete',
    template: `
    <div class="btnitem">
    <button type="button" *ngIf="config.deleteUrl" class="available" (click)="delete()" [disabled]="!object">
      <i class="iconfont icon-shanchu"></i><span>删除</span>
    </button>
  </div>
  `
})

export class DeleteActionBarComponent {
    @Input() config:any;
    @Input() object:any
    @Output() objectDelete = new EventEmitter();
    constructor(private router: Router,private http:HttpInterceptorService) {}
    delete() {
        this.objectDelete.emit(1)
    }

}
