import {Component,Input} from '@angular/core';

@Component({
  selector: 'ng-schdule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent{
  @Input() schduleData: {};


}
