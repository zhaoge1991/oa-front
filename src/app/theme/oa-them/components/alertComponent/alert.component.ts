import {Component,Input,trigger,state,style,transition,animate} from '@angular/core';
import {AlertService} from "../../../../services/core/alert.component.service";


@Component({
  selector: 'alert',
  template: `
  <div *ngIf="hasMessages()" class="mess-content" (click)="event(false)">
      <div *ngFor="let msg of value" class="ui-messages ui-widget ui-corner-all" style="display:block" [@flyInOut]
                  [ngClass]="{'ui-messages-info':(msg.severity === 'info'),
                  'ui-messages-warn':(msg.severity === 'warn'),
                  'ui-messages-error':(msg.severity === 'error'),
                  'ui-messages-success':(msg.severity === 'success')}">
          <span class="ui-messages-close" (click)="clear(msg)" *ngIf="closable">
              <i class="fa fa-close"></i>
          </span>
          <span class="{{'ui-messages-icon fa fa-fw fa-2x '+icon(msg)}}"></span>
          <div class="ui-growl-message">
              <h4 class="ui-messages-summary">{{msg.title}}</h4>
              <div>
                  <p class="ui-messages-detail">{{msg.detail}}</p>
              </div>
              <div class="buttons clearfix">
                  <div class="pull-right">
                      <button (click)="event(true,msg)" class="btn btn-primary  btn-sm">确认</button>
                      <button (click)="event(false,msg)" class="btn btn-primary  btn-sm">取消</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `,
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('flyInOut',[
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
})

export class AlertComponent {
  private value = [];
  @Input() closable: boolean = true;

  constructor(private meService: AlertService){
    this.meService.message$.subscribe((data:any)=>{
      this.value.push(data);
      //定时清除消息
      if(data.life){
        setTimeout(()=>this.clear(data),data.life);
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
  }

  event(e:boolean,msg){
    this.meService.putEvent(e);
    this.clear(msg);
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
