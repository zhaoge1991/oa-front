import { Component } from '@angular/core';

@Component({
  selector: 'setting',
  template: `<p>setting view</p><router-outlet></router-outlet>`
})

export class SettingComponent {
  constructor() {
    console.log('set')
  }
}
