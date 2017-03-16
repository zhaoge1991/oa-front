import {Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, OnInit,OnChanges} from '@angular/core';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig"
@Component({
    selector: 'bar-common-action-bar',
    templateUrl: './commonActionBar.html',
    styleUrls: ['./commonActionBar.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CommonActionBarComponent{
    @Input() config: CommonActionBarConfig;
    @Input() object: any;
    @Output() objectChange = new EventEmitter();
    @Output() objectDelete = new EventEmitter();
    change(object){
        this.objectChange.emit(this.object);
    }
    delete(b:boolean){
        if(b){
            this.objectDelete.emit(1);
        }
        
    }
    
   
}
