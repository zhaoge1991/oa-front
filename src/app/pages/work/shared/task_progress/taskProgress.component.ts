import {Component,Input,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'task-progress',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './taskProgress.component.html',
  styleUrls: ['./taskProgress.component.scss']
})

export class TaskProgressComponent{
  @Input() progress;
}
