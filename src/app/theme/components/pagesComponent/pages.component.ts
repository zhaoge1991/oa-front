import {Component, EventEmitter, Input, Output,OnChanges} from "@angular/core";

@Component({
  selector: 'pages',
  template: require('./pages.html'),
  styles: [require('./pages.scss')]
})
export class PagesComponent implements OnChanges{
  @Input()  nowPage: number;
  @Input()  lastPage: number;
  @Output() pageClick = new EventEmitter();
  private pageInput:boolean = false;
  private pages=[{}];

  ngOnChanges(){
    if(this.lastPage>15){
      this.pageInput = true;
    }
    this.setPages();
  }

  setPages(){
    this.pages= [];
    if(this.lastPage < 13){
      for(let i=1;i<=this.lastPage;i++){
        if(this.nowPage === i){
          this.pages.push({
            text: i,
            disabled: true,
            class: 'nowpage'
          })
        } else {
          this.pages.push({
            text: i,
            disabled: false,
            class: 'pagenum'
          })
        }

      }
    } else {
      if(this.nowPage<7){
        for(let i=1;i<=8;i++){
          if(this.nowPage === i){
            this.pages.push({
              text: i,
              disabled: true,
              class: 'nowpage'
            })
          } else {
            this.pages.push({
              text: i,
              disabled: false,
              class: 'pagenum'
            })
          }
        }
        this.pages.push({text: '…', disabled: true, class: 'emit'});
        for(let i=(this.lastPage-1);i<=this.lastPage;i++){
          this.pages.push({
            text: i,
            disabled: false,
            class: 'pagenum'
          })
        }
      } else if(this.nowPage>=7&&this.nowPage<(this.lastPage-3)){
        this.pages.push({text: 1, disabled: false, class: 'pagenum'});
        this.pages.push({text: 2, disabled: false, class: 'pagenum'});
        this.pages.push({text: '…', disabled: true, class: 'emit'});
        for(let i=this.nowPage-3;i<=this.nowPage+3;i++){
          if(this.nowPage === i){
            this.pages.push({
              text: i,
              disabled: true,
              class: 'nowpage'
            })
          } else {
            this.pages.push({
              text: i,
              disabled: false,
              class: 'pagenum'
            })
          }
        }
        this.pages.push({text: '…', disabled: true, class: 'emit'});
        this.pages.push({text: this.lastPage-2, disabled: false, class: 'pagenum'});
        this.pages.push({text: this.lastPage, disabled: false, class: 'pagenum'});
      } else if(this.nowPage>=(this.lastPage-3)){
        this.pages.push({text: 1, disabled: false, class: 'pagenum'});
        this.pages.push({text: 2, disabled: false, class: 'pagenum'});
        this.pages.push({text: '…', disabled: true, class: 'emit'});
        for(let i=this.lastPage-6;i<=this.lastPage;i++){
          if(this.nowPage === i){
            this.pages.push({
              text: i,
              disabled: true,
              class: 'nowpage'
            })
          } else {
            this.pages.push({
              text: i,
              disabled: false,
              class: 'pagenum'
            })
          }
        }
      }
    }

  }

  pageclick(page) {
    this.pageClick.emit(page);
  }
  pageInputUp($event){
    let val = $event.target.value.replace(/[^0-9]/g,'');
    if((val-0)>this.lastPage){
      $event.target.value = this.lastPage;
    } else {$event.target.value = val;}
    let page:number = $event.target.value -0;
    if($event.keyCode === 13 && page !=0 ){
      this.pageClick.emit({text: page});
      $event.target.value = '';
    }

  }
}
