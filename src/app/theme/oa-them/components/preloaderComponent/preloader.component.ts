import {Component} from '@angular/core';
import {PreloaderService} from "../../../../services/core/preloaderComponent.service";

@Component({
  selector: 'preloader',
  template: `<div class="preloader" *ngIf="isshow">
                <div class="spinner">
                  <div class="rect1"></div>
                  <div class="rect2"></div>
                  <div class="rect3"></div>
                  <div class="rect4"></div>
                  <div class="rect5"></div>
                </div>
             </div>`,
  styleUrls: ['./preloader.component.scss'],
})

export class PreloaderComponent{
  public isshow:boolean = false;

  constructor(private preloaderservice: PreloaderService){
    this.preloaderservice.toggle$.subscribe(tog=>{
      this.isshow = tog;
    })
  }

}
