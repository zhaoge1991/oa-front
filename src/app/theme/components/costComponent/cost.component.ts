import {Component,Output,EventEmitter,ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
  selector: 'cost-component',
  template: require('./cost.component.html'),
  styles: []
})

export class CostComponent {
  private ordercostData:{name:string,price: string} = {name:'',price: ''};
  @Output() ordercostDataChange = new EventEmitter();

  ordercostEmit(){
    this.ordercostDataChange.emit(JSON.parse(JSON.stringify(this.ordercostData)))
    this.ordercostData = {name: '',price: ''};
    this.textModal.hide();
  }

  @ViewChild('textdialog') textModal: ModalDirective;
  showdialog(){
    this.textModal.show();
  }
}
