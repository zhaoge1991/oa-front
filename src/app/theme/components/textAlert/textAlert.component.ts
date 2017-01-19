import {Component,OnInit} from '@angular/core';
import {TextAlertService} from "../../../core/textAlertService/textAlert.service";


@Component({
  selector: 'text-alert',
  template: `
  <div *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">{{message.text}}</div>
  `,
  styles: [require('./textAlert.scss')]
})

export class TextAlertComponent implements OnInit{
  message: any;
  constructor(private alertService: TextAlertService){}
  ngOnInit(){
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
}
