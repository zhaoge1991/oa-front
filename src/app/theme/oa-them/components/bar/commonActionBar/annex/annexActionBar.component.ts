import {Component, Input,EventEmitter,Output,ViewChild,OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AnnexesComponent} from "../../../annexesComponent/annexes.component";
@Component({
  selector: 'bar-common-action-bar-annex',
  template: `
  <div class="btnitem" *ngIf="config.annex" >
    <button type="button"  class="available" (click)="showAnnexes()" [disabled]="!object">
      <i class="iconfont icon-fujian"></i><span>附件</span><i *ngIf="object">({{annexeslength}})</i>
    </button>
    <annexes #annexesdialog *ngIf="object" [data]="object" [idname]="config.idName" (annexChange)="annexChange()"></annexes>
  </div>
  `
})

export class AnnexActionBarComponent implements OnChanges{
  @Input() config:any;
  @Input() object:any
  constructor() {}

  ngOnChanges(){
    this.getAnnexesLength();
  }
  //附件按钮
  @ViewChild('annexesdialog') annexesModal: AnnexesComponent;
  private annexeslength
  getAnnexesLength(){
    if(this.object){
      this.annexeslength = this.object.annex?this.object.annex.length:0;
    }
  }
  showAnnexes(){
    this.annexesModal.show();
  }
  annexChange(){
    this.getAnnexesLength();
  }
}
