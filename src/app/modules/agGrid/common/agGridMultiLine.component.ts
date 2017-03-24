import {Component, ViewContainerRef, ViewChild, AfterViewInit} from '@angular/core';

import {ICellEditorAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'editor-cell',
    template: `
        <div>
             <textarea #container style="width:500px;height:100px" name="value" [(ngModel)]="params.value" (keydown)="onKeyDown($event)"></textarea>
        </div>
    `,
    
})
export class AgGridMultiLineComponent implements ICellEditorAngularComp,AfterViewInit {
    @ViewChild('container', {read: ViewContainerRef}) public container;
    private params: any;

    public happy = false;
    
    ngAfterViewInit() {
        this.container.element.nativeElement.focus();
    }

    agInit(params: any): void {
        this.params = params;
    }

    getValue(): any {
        return this.params.value;
    }

    isPopup(): boolean {
        return true;
    }
    
    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if(event.ctrlKey&&key == 13){
            let prefix =  this.container.element.nativeElement.value.substring(0, this.container.element.nativeElement.selectionStart)
            let suffix = this.container.element.nativeElement.value.substring(this.container.element.nativeElement.selectionEnd); 
            event.stopPropagation();
            this.params.value=prefix+"\n"+suffix;
        }
        
        
    }
}

