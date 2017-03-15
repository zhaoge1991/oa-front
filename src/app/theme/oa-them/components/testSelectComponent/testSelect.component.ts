import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: 'test-select',
    templateUrl: './testSelect.html',
    styleUrls: ['./testSelect.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class TestSelectComponent {
    //弹出列表框
    @ViewChild('testDialog') testDialog: ModalDirective;

    private pageconfig: {
        nowPage: number,
        lastPage: number,
        total: number,
        fromitem: number,
        toitem: number
    }
    
}
