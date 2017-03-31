import {Component, Input,EventEmitter,Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {HttpInterceptorService} from '../../../../../../services/interceptor'
import {MessageService} from "../../../../../../services/core/messageComponent.service";

@Component({
  selector: 'bar-common-action-bar-exportOrder',
  template: `
    <div class="btnitem"  *ngIf="config.exportOrder">
    <button type="button" class="available" (click)="exportOrder()" [disabled]="!object">
      <i class="iconfont icon-shanchu"></i><span>生成订单</span>
    </button>
  </div>
  `
})

export class ExportOrderActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectDelete = new EventEmitter();
  constructor(private router: Router,private http:HttpInterceptorService,private messageservice:MessageService) {}
  exportOrder() {
    let body = {contract_ids: [this.object.id]};
    this.http.post('/api/sale/table/contract/to_order',body).subscribe(res=>{
      if (res.status == 200) {
        this.messageservice.putMessage({
          summary: '生成成功',
          detail: '生成订单成功',
          severity: 'success',
          life: 3000
        });
      } else {
        this.messageservice.putMessage({
          summary: '生成失败',
          detail: '生成合同失败',
          severity: 'error'
        })
      }
    })
  }

}
