import {
  Input,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'action-bar',
  template: `<ng-content></ng-content>`,
  styles: [require('./actionBar.scss')],
  encapsulation: ViewEncapsulation.None
})

export class ActionBar{
  @Input() actions: any[];
}
