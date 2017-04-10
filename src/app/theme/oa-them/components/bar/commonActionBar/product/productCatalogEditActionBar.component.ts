import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'bar-common-action-bar-productCatalogEdit',
  template: `
    <div class="btnitem" *ngIf="config.isproduct">
      <button type="button" class="available" (click)="open()" [disabled]="!iscatalog">
        <i class="iconfont icon-dakai"></i><span>编辑分类</span>
      </button>
    </div>
  `
})

export class ProductCatalogEditActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any;
  public iscatalog:boolean = false;
  constructor(private router: Router) {}

  ngOnChanges(){
    if(this.object){
      this.object.tree_catalog_id?this.iscatalog = true:this.iscatalog = false;
    } else {
      this.iscatalog = false;
    }
  }

  open() {
    if(this.iscatalog){
      this.router.navigate(['pages/product/products/catalog/edit',this.object.id]);
    }
  }

}
