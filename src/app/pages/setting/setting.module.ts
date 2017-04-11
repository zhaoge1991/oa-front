import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import  {routing} from './setting.routing';
import { SettingComponent} from './setting.component'
import {ErpsettingModule} from "./erpsetting/erpsetting.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ErpsettingModule,
    routing,
  ],
  declarations: [SettingComponent],
})

export class SettingModule{}
