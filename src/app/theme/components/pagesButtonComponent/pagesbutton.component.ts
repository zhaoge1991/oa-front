import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'pages-button',
  template: require('./pagesbutton.html'),
  styles: [require('./pages.scss')]
})
export class PagesButtonComponent{
  @Input()  pageconfig;
  @Output() pageClick = new EventEmitter();

  turnpage(pages:any){
    if(pages === 'first'){
      this.pageClick.emit({text: 1});
    } else if(pages === 'last'){
      this.pageClick.emit({text: this.pageconfig.lastPage});
    } else this.pageClick.emit({text: this.pageconfig.nowPage+pages});
  }

  pageInputUp($event){
    let val = $event.target.value.replace(/[^0-9]/g,'');
    if((val-0)>this.pageconfig.lastPage){
      $event.target.value = this.pageconfig.lastPage;
    } else {$event.target.value = val;}
    let page:number = $event.target.value -0;
    if($event.keyCode === 13 && page !=0 ){
      this.pageClick.emit({text: page});
      $event.target.value = '';
    }

  }
}
