import {Component} from '@angular/core';

import {OrderService} from '../../services/order/order.service'


@Component({
  selector: 'procurement',
  template: `<strong>1111111111111111111111My page content here</strong><router-outlet></router-outlet><p>122121212121212</p>`
})
export class ProcurementComponent {
  constructor(private orderservice: OrderService) {
      console.log(111);
  }
}

