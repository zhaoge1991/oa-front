import {Component,Output,EventEmitter,Input} from '@angular/core';

@Component({
  selector: 'ng-search',
  template: `
    <div class="search-input">
      <span class="iconfont icon-search"></span>
      <input #input type="text" class="ng-form-control" [placeholder]="placeholder" [value]="text?text:''" (keyup.enter)="search(input.value)" (keyup)="change(input.value)">
      <button (click)="search(input.value)" class="btn btn-primary  btn-sm" type="button">搜索</button>
    </div>
  `,
  styleUrls: ['./ng2-search.component.scss']
})

export class SearchComponent{
  @Input() placeholder = '搜索';
  @Input() text = '';
  @Output() textChange = new EventEmitter();
  @Output() searchtext = new EventEmitter();

  search($event){
    this.searchtext.emit($event);
  }

  change($event){
    this.text = $event;
    this.textChange.emit(this.text);
  }

}
