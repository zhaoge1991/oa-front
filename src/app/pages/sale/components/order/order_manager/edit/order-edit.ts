import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'edit',
  template: require('./order-edit.html'),
  styles: []
})

export class OrderEditComponent {
  constructor(private router: Router){}
  private goBack(){
    this.router.navigate(['pages/sale/order-manager'])
  }
}
