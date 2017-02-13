import {Component,Input} from '@angular/core';
import {MessageService} from "./../../../core/messageComponent.service.ts";

@Component({
  selector: 'ng-message',
  template: `
  <div *ngIf="hasMessages()" class="mess-content">
      <div *ngFor="let msg of value" class="ui-messages ui-widget ui-corner-all" style="display:block"
                  [ngClass]="{'ui-messages-info':(msg.severity === 'info'),
                  'ui-messages-warn':(msg.severity === 'warn'),
                  'ui-messages-error':(msg.severity === 'error'),
                  'ui-messages-success':(msg.severity === 'success')}">
          <a href="#" class="ui-messages-close" (click)="clear(msg)" *ngIf="closable">
              <i class="fa fa-close"></i>
          </a>
          <span class="{{'ui-messages-icon fa fa-fw fa-2x '+icon(msg)}}"></span>
          <div class="ui-growl-message">
              <div>
                  <span class="ui-messages-summary">{{msg.summary}}</span>
                  <p class="ui-messages-detail">{{msg.detail}}</p>
              </div>
          </div>
      </div>
  </div>
  `,
  styles: [require('./message.component.scss')]
})

export class MessageComponent {
  private value = [];
  @Input() closable: boolean = true;

  constructor(private meService: MessageService){
    this.meService.message$.subscribe(data=>{
      for(let i=0;i<data.length;i++){
        this.value.push(data[i]);
      }
      this.hasMessages();
    })
  }

  hasMessages() {
    return this.value && this.value.length > 0;
  }

  clear(msg) {
    for(let i=0;i<this.value.length;i++){
      if(msg == this.value[i]){
        this.value.splice(i,1);
      }
    }
    event.preventDefault();
  }

  icon(msg): string {
    let icon: string = null;
    if(this.hasMessages()) {
      switch(msg.severity) {
        case 'success':
          icon = 'ion-checkmark';
          break;

        case 'info':
          icon = 'ion-information-circled';
          break;

        case 'error':
          icon = 'ion-close-circled';
          break;

        case 'warn':
          icon = 'ion-alert-circled';
          break;

        default:
          icon = 'ion-information-circled';
          break;
      }
    }

    return icon;
  }
}
