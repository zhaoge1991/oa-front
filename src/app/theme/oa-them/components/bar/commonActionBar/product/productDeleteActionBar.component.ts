import {Component, Input, OnChanges,Output,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from "../../../../../../services/core/alert.component.service";
import {ProductCatalogService} from "../../../../../../services/product/productCatalog/product_catalog.service";
import {ProductListService} from "../../../../../../services/product/productList/product_list.service";
@Component({
  selector: 'bar-common-action-bar-productDelete',
  template: `
    <div class="btnitem" *ngIf="config.isproduct">
      <button type="button" class="available" (click)="delete()" [disabled]="!isproduct">
        <i class="iconfont icon-dakai"></i><span>删除产品</span>
      </button>
    </div>
  `,
  providers: [ProductListService]
})

export class ProductDeleteActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any;
  @Output() objectDelete = new EventEmitter();

  public isproduct:boolean = false;
  constructor(private router: Router,private alertservice: AlertService,private productservice:ProductListService) {}

  ngOnChanges(){
    if(this.object){
      this.object.product_id?this.isproduct = true:this.isproduct = false;
    } else {
      this.isproduct = false;
    }
  }

  delete() {
    if(this.isproduct){
      let sub = this.alertservice.putMessage({
        title: '询问弹窗',
        detail: '确定要删除产品吗？',
        severity: 'info'
      }).subscribe(data=>{
        if(data){
          this.productservice.delete(this.object.product_id).subscribe(data=>{
            this.objectDelete.emit(true);
          })
        }
        sub.unsubscribe();
      });
    }
  }

}
