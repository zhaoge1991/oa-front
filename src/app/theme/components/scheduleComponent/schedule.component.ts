import {Component,Input} from '@angular/core';

@Component({
  selector: 'ng-schdule',
  template: require('./schedule.component.html'),
  styles: [require('./schedule.component.scss')]
})

export class ScheduleComponent{
  @Input() schduleData: {};


}
