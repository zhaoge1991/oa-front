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

    change(object){
        this.objectChange.emit(this.object);
    }


}
