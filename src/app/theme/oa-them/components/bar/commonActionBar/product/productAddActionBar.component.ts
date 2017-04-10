import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bar-common-action-bar-productAdd',
  template: `
    <div class="btnitem" *ngIf="config.isproduct">
      <button type="button" class="available" (click)="add()">
        <i class="iconfont icon-dakai"></i><span>添加产品</span>
      </button>
    </div>
  `
})

export class ProductAddActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any;

  public isproduct:boolean = false;
  constructor(private router: Router) {}

  ngOnChanges(){
    if(this.object){
      this.object.product_id?this.isproduct = true:this.isproduct = false;
    }
  }

  add() {
    this.router.navigate(['pages/product/products/product/edit']);
  }

}
