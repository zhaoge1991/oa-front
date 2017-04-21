import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './task.routing.ts';

import { TaskComponent} from './task.component.ts'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    TaskComponent
  ]
})
export class TaskModule {}
