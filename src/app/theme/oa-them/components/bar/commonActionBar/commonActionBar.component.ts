import {Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, OnInit,OnChanges} from '@angular/core';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig"
import {Comment} from "../../../../../models/common/comment";
@Component({
    selector: 'bar-common-action-bar',
    templateUrl: './commonActionBar.html',
    styleUrls: ['./commonActionBar.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CommonActionBarComponent{
    @Input() config: CommonActionBarConfig;
    @Input() object: any;
    @Input() objects: any;
    @Output() objectChange = new EventEmitter();
    @Output() objectDelete = new EventEmitter();
    @Output() objectSave = new EventEmitter();
    @Output() objectExport = new EventEmitter();
    @Output() objectComment = new EventEmitter();
    @Output() onComplete = new EventEmitter();
    change(object){
        this.objectChange.emit(object);
    }
    delete(b:boolean){
        if(b){
            this.objectDelete.emit(true);
        }
    }
    save(e:boolean){
        if(e){
            this.objectSave.emit(true);
        }
    }
    export(e:string){
        this.objectExport.emit(e);
    }
    comment(e:Comment){
      this.objectComment.emit(e);
    }
    complete(event:boolean){
        this.onComplete.emit(true);
    }


}
