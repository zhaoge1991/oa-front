import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'bar-common-action-bar-productCatalogAddParent',
  template: `
    <div class="btnitem" *ngIf="config.isproduct">
      <button type="button" class="available" (click)="open()">
        <i class="iconfont icon-dakai"></i><span>添加分类</span>
      </button>
    </div>
  `
})

export class ProductCatalogAddParentActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any;
  public iscatalog:boolean = false;
  constructor(private router: Router) {}

  ngOnChanges(){
    if(this.object){
      this.object.tree_catalog_id?this.iscatalog = true:this.iscatalog = false;
    }
  }

  open() {
    this.router.navigate(['pages/product/products/catalog/edit']);
  }

}
