import {Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig"

@Component({
    selector: 'bar-common-action-bar',
    templateUrl: './commonActionBar.html',
    styleUrls: ['./commonActionBar.scss'],
})

export class CommonActionBarComponent {
    @Input() config: CommonActionBarConfig;
    @Input() object:any;
    @Input() objects:any[];
    }
