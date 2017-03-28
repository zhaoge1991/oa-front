import {Component, Input,EventEmitter,Output,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'bar-common-action-bar-depot',
  templateUrl: './depotActionBar.component.html'
})

export class DepotActionBarComponent {
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();

  constructor(private router:Router) {
  }

  outbound() {
    this.router.navigate([this.config.depotUrl, this.object[this.config.idName]]);
  }
}
