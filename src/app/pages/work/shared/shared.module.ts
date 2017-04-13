import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OaModule} from "../../../theme/oa-them/oa.module";
import {TaskProgressComponent} from "./task_progress/taskProgress.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OaModule
  ],
  declarations: [
    TaskProgressComponent
  ],
  exports: [TaskProgressComponent],
  providers: []
})
export class SharedModule {
}

