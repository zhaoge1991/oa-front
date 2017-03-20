import {Component,Input,Output,ViewChild,EventEmitter} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/index";

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: []
})

export class DialogComponent{
  @Input() dialogconfig: {};
  @Output() trueClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('childModal') ChildModal: ModalDirective;
  show(){
    this.ChildModal.show()
  }

  trueclick($event){
    this.trueClick.emit($event);
  }
}
