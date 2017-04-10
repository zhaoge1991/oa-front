import {Component, Input, OnChanges,Output,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from "../../../../../../services/core/alert.component.service";
import {ProductCatalogService} from "../../../../../../services/product/productCatalog/product_catalog.service";
@Component({
  selector: 'bar-common-action-bar-productCatalogDelete',
  template: `
    <div class="btnitem" *ngIf="config.isproduct">
      <button type="button" class="available" (click)="delete()" [disabled]="!iscatalog">
        <i class="iconfont icon-dakai"></i><span>删除分类</span>
      </button>
    </div>
  `,
  providers: [ProductCatalogService]
})

export class ProductCatalogDeleteActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any;
  @Output() objectDelete = new EventEmitter();

  public iscatalog:boolean = false;
  constructor(private router: Router,private alertservice: AlertService,private catalogservice:ProductCatalogService) {}

  ngOnChanges(){
    if(this.object){
      this.object.tree_catalog_id?this.iscatalog = true:this.iscatalog = false;
    } else {
      this.iscatalog = false;
    }
  }

  delete() {
    if(this.iscatalog){
      let sub = this.alertservice.putMessage({
        title: '询问弹窗',
        detail: '确定要删除分类吗？其子类将同时删除！',
        severity: 'info'
      }).subscribe(data=>{
        if(data){
          this.catalogservice.delete(this.object.id).subscribe(data=>{
            this.objectDelete.emit(true);
          })
        }
        sub.unsubscribe();
      });
    }
  }

}
