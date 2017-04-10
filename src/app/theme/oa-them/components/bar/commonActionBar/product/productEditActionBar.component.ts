import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bar-common-action-bar-productEdit',
  template: `
    <div class="btnitem" *ngIf="config.isproduct">
      <button type="button" class="available" (click)="edit()"  [disabled]="!isproduct">
        <i class="iconfont icon-dakai"></i><span>编辑产品</span>
      </button>
    </div>
  `
})

export class ProductEditActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any;

  public isproduct:boolean = false;
  constructor(private router: Router) {}

  ngOnChanges(){
    if(this.object){
      this.object.product_id?this.isproduct = true:this.isproduct = false;
    } else {
      this.isproduct = false;
    }
  }

  edit() {
    if(this.isproduct){
      this.router.navigate(['pages/product/products/product/edit',this.object.product_id]);
    }
  }

}
