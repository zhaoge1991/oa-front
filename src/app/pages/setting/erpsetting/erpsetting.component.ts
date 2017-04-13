import { Component } from '@angular/core';

@Component({
  selector: 'erpsetting',
  template: `<router-outlet></router-outlet>`
})

export class ErpsettingComponent {
  constructor() {
    console.log('erpsetting')
  }
}
